<?php
namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    public function getConversations()
    {
        $user = Auth::user();
        Log::info('Fetching conversations', ['user_id' => $user->id, 'role' => $user->role]);

        try {
            if ($user->role === 'admin') {
                $conversations = Conversation::with('guest')->get();
            } else {
                $conversations = Conversation::where('guest_id', $user->id)->get();
            }

            Log::info('Conversations retrieved successfully', [
                'user_id' => $user->id,
                'conversation_count' => $conversations->count()
            ]);

            return $conversations;
        } catch (\Exception $e) {
            Log::error('Failed to fetch conversations', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function getMessages($conversationId)
    {
        $user = Auth::user();
        Log::info('Fetching messages for conversation', [
            'user_id' => $user->id,
            'conversation_id' => $conversationId
        ]);

        try {
            $conversation = Conversation::findOrFail($conversationId);

            if ($user->role !== 'admin' && $conversation->guest_id !== $user->id) {
                Log::warning('Unauthorized access attempt to messages', [
                    'user_id' => $user->id,
                    'conversation_id' => $conversationId
                ]);
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $messages = Message::where('conversation_id', $conversationId)
                ->with('sender')
                ->get();

            Log::info('Messages retrieved successfully', [
                'user_id' => $user->id,
                'conversation_id' => $conversationId,
                'message_count' => $messages->count()
            ]);

            return $messages;
        } catch (\Exception $e) {
            Log::error('Failed to fetch messages', [
                'user_id' => $user->id,
                'conversation_id' => $conversationId,
                'error' => $e->getMessage()
            ]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function sendMessage(Request $request)
    {
        Log::info('Received request to send message', [
            'method' => $request->method(),
            'data' => $request->all(),
        ]);

        $user = Auth::user();
        Log::info('Attempting to send message', [
            'user_id' => $user->id,
            'conversation_id' => $request->conversation_id
        ]);

        try {
            $request->validate([
                'conversation_id' => 'required|exists:conversations,id',
                'content' => 'required|string',
            ]);

            $conversation = Conversation::findOrFail($request->conversation_id);

            if ($user->role !== 'admin' && $conversation->guest_id !== $user->id) {
                Log::warning('Unauthorized message send attempt', [
                    'user_id' => $user->id,
                    'conversation_id' => $request->conversation_id
                ]);
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $message = Message::create([
                'conversation_id' => $request->conversation_id,
                'sender_id' => $user->id,
                'content' => $request->content,
            ]);

            broadcast(new MessageSent($message))->toOthers();

            Log::info('Message sent successfully', [
                'user_id' => $user->id,
                'conversation_id' => $request->conversation_id,
                'message_id' => $message->id
            ]);

            return $message->load('sender');
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('Message validation failed', [
                'user_id' => $user->id,
                'errors' => $e->errors()
            ]);
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Failed to send message', [
                'user_id' => $user->id,
                'conversation_id' => $request->conversation_id,
                'error' => $e->getMessage()
            ]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function startConversation()
    {
        $user = Auth::user();
        Log::info('Attempting to start conversation', ['user_id' => $user->id]);

        try {
            if ($user->role !== 'guest') {
                Log::warning('Non-guest attempted to start conversation', [
                    'user_id' => $user->id,
                    'role' => $user->role
                ]);
                return response()->json(['error' => 'Only guests can start conversations'], 403);
            }

            $conversation = Conversation::firstOrCreate(['guest_id' => $user->id]);

            Log::info('Conversation started successfully', [
                'user_id' => $user->id,
                'conversation_id' => $conversation->id
            ]);

            return $conversation;
        } catch (\Exception $e) {
            Log::error('Failed to start conversation', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }
}
