<?php

namespace App\Http\Requests;

use App\Models\Report;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'reason' => ['required', Rule::in(array_keys(Report::USER_REPORT_REASONS))],
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'User is required to submit a report.',
            'user_id.exists' => 'The selected user does not exist.',
            'reason.required' => 'Please select a reason for reporting.',
            'reason.in' => 'The selected reason is invalid.',
        ];
    }
}
