<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateContactSubmissionStatusRequest;
use App\Models\ContactSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactSubmissionController extends Controller
{
    public function index(): Response
    {
        $submissions = ContactSubmission::query()->orderByDesc('created_at')->paginate(25);
        return Inertia::render('portfolio/admin/contact-submissions-index', [
            'submissions' => $submissions,
        ]);
    }

    public function show(ContactSubmission $contact_submission): Response
    {
        return Inertia::render('portfolio/admin/contact-submissions-show', [
            'submission' => $contact_submission,
        ]);
    }

    public function destroy(ContactSubmission $contact_submission): RedirectResponse
    {
        $contact_submission->delete();
        return redirect()->route('admin.portfolio.contact-submissions.index')->with('success','Deleted');
    }

    public function markAsRead(ContactSubmission $submission): RedirectResponse
    {
        $submission->update(['status' => 'read']);
        return back()->with('success','Marked as read');
    }

    public function export()
    {
        $rows = ContactSubmission::orderByDesc('created_at')->get();
        $csv = implode(",", ['id','name','email','subject','status','created_at'])."\n";
        foreach ($rows as $r) {
            $csv .= implode(",", [
                $r->id,
                '"'.str_replace('"','""',$r->name).'"',
                $r->email,
                '"'.str_replace('"','""',$r->subject).'"',
                $r->status,
                $r->created_at,
            ])."\n";
        }
        return FacadeResponse::make($csv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="contact_submissions.csv"',
        ]);
    }
}
