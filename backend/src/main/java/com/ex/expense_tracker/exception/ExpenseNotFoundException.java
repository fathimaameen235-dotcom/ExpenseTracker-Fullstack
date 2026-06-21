package com.ex.expense_tracker.exception;

/**
 * Custom exception for when an expense is not found
 */
public class ExpenseNotFoundException extends RuntimeException {
    public ExpenseNotFoundException(String message) {
        super(message);
    }

    public ExpenseNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
