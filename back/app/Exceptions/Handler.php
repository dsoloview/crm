<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->renderable(function (Throwable $e) {
                if (request()->is('api/*')) {
                    if ($e instanceof AuthenticationException) {
                        return response()->json([
                            'message' => $e->getMessage(),
                            'status' => 401
                        ], 401);
                    }

                    if ($e instanceof \Illuminate\Validation\ValidationException) {
                        return response()->json([
                            'message' => $e->getMessage(),
                            'errors' => $e->errors(),
                            'status' => 422
                        ], 422);
                    }

                    $code = $e->getCode() !== 0 ? $e->getCode() : 500;
                    return response()->json([
                        'message' => $e->getMessage(),
                        'status' => $code,
                        'line' => $e->getLine(),
                        'file' => $e->getFile(),
                    ], $code);
                }
        });
    }
}
