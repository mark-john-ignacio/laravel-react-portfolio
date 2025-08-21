<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>New Contact Message</title>
</head>
<body>
    <h1>New Contact Message</h1>
    <p><strong>Name:</strong> {{ $name }}</p>
    <p><strong>Email:</strong> {{ $email }}</p>
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap">{{ $messageText }}</pre>
</body>
</html>
