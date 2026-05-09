<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreFeedbackRequest extends FormRequest
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
            'title' => 'required|string|max:100',
            'category' => 'required|string|in:feature_request,bug_report,ui_ux,performance,other',
            'description' => 'required|string|max:2000'
        ];
    }

    public function messages(): array {
        return [
            'category.in' => 'The selected category is invalid.',
            'title.max' => 'Title cannot exceed 100 characters.',
            'description.max' => 'Description cannot exceed 2000 characters.',
        ];
    }
}
