<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateFeedbackRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:100',
            'category' => 'sometimes|required|string|in:feature_request,bug_report,ui_ux,performance,other',
            'description' => 'sometimes|required|string|max:2000',
            'status' => 'sometimes|required|string|in:open,in_progress,completed',
        ];
    }
}
