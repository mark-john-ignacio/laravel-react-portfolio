@php($m = $contactMessage)
<h1>New Contact Message</h1>
<p><strong>Name:</strong> {{ $m->name }}</p>
<p><strong>Email:</strong> {{ $m->email }}</p>
@if($m->subject)
<p><strong>Subject:</strong> {{ $m->subject }}</p>
@endif
<p><strong>Message:</strong></p>
<pre style="white-space:pre-wrap;font-family:inherit;">{{ $m->message }}</pre>
