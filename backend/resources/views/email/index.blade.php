<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>{{ $title }}</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px; margin: 0;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table
                    style="background-color: #ffffff; max-width: 600px; width: 100%; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);"
                    cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="text-align: center;">
                            <h2 style="color: #2c3e50; margin-bottom: 10px;">{{ $title }}</h2>
                            <hr style="border: none; border-top: 1px solid #ddd;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 15px; color: #333333; font-size: 16px;">
                            <p>{{ $content }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px 0; text-align: center;">
                            <a href="{{ $url }}"
                                style="background-color: #3498db; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                                Xem chi tiết lịch hẹn
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 20px; font-size: 13px; color: #888888; text-align: center;">
                            Nếu bạn không thực hiện hành động này, vui lòng bỏ qua email này.
                        </td>
                    </tr>
                </table>
                <p style="font-size: 12px; color: #999999; margin-top: 20px;">&copy; {{ date('Y') }} MyApp. All
                    rights reserved.</p>
            </td>
        </tr>
    </table>
</body>

</html>
