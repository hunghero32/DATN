import { ref, push, update, onValue, off } from 'firebase/database';
import { database } from '../config/firebase';
import { Modal as AntModal } from 'antd';

const NotificationService = {
  // Gửi thông báo
  sendNotification: async (doctorId, notification) => {
    try {
      const notificationsRef = ref(database, `notifications/${doctorId}`);
      const newNotificationRef = push(notificationsRef);
      
      await update(newNotificationRef, {
        ...notification,
        timestamp: Date.now(),
        read: false
      });
      
      return true;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  },

  // Lắng nghe thông báo mới
  subscribeToNotifications: (doctorId, callback) => {
    console.log('Subscribing to notifications for doctor:', doctorId);
    
    const notificationsRef = ref(database, `notifications/${doctorId}`);
    
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Received notification data:', data);
      
      if (data) {
        // Convert object to array and sort by timestamp
        const notificationsArray = Object.entries(data).map(([id, notification]) => ({
          id,
          ...notification
        })).sort((a, b) => b.timestamp - a.timestamp);
        
        callback(notificationsArray);
      } else {
        callback([]);
      }
    });

    // Return unsubscribe function
    return () => off(notificationsRef);
  },

  // Đánh dấu thông báo đã đọc
  markAsRead: async (doctorId, notificationId) => {
    try {
      const updates = {};
      updates[`notifications/${doctorId}/${notificationId}/read`] = true;
      await update(ref(database), updates);
      return true;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
  }
};

export default NotificationService;