<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'feedback_id' => 'required|exists:feedback,id',
            'reason' => 'required|in:spam,duplicate_feedback,offensive_content,harassment,misleading_information,other',
            'details' => 'nullable|string|max:1000',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'feedback_id.required' => 'Feedback is required to submit a report.',
            'feedback_id.exists' => 'The selected feedback does not exist.',
            'reason.required' => 'Please select a reason for reporting.',
            'reason.in' => 'The selected reason is invalid.',
            'details.max' => 'Details cannot exceed 1000 characters.',
        ];
    }
}
