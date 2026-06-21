package com.ex.expense_tracker.controller;

import com.ex.expense_tracker.dto.ExpenseRequestDTO;
import com.ex.expense_tracker.dto.ExpenseResponseDTO;
import com.ex.expense_tracker.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/**
 * REST Controller for Expense management endpoints
 * Base path: /api/expenses
 */
@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:5173",
        "https://expense-tracker-roan-seven.vercel.app" }, allowedHeaders = "*", methods = { RequestMethod.GET,
                RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE,
                RequestMethod.OPTIONS }, allowCredentials = "true")
public class ExpenseController {

    private final ExpenseService expenseService;

    /**
     * Get all expenses
     * 
     * @return list of all expenses
     */
    @GetMapping
    public ResponseEntity<List<ExpenseResponseDTO>> getAllExpenses() {
        List<ExpenseResponseDTO> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }

    /**
     * Get expense by id
     * 
     * @param id the expense id
     * @return the expense if found
     */
    @GetMapping("/{id}")
    public ResponseEntity<ExpenseResponseDTO> getExpenseById(@PathVariable Long id) {
        ExpenseResponseDTO expense = expenseService.getExpenseById(id);
        return ResponseEntity.ok(expense);
    }

    /**
     * Create a new expense
     * 
     * @param requestDTO the expense data
     * @return the created expense with 201 status
     */
    @PostMapping
    public ResponseEntity<ExpenseResponseDTO> createExpense(@RequestBody ExpenseRequestDTO requestDTO) {
        ExpenseResponseDTO expense = expenseService.createExpense(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(expense);
    }

    /**
     * Update an existing expense
     * 
     * @param id         the expense id
     * @param requestDTO the updated expense data
     * @return the updated expense
     */
    @PutMapping("/{id}")
    public ResponseEntity<ExpenseResponseDTO> updateExpense(
            @PathVariable Long id,
            @RequestBody ExpenseRequestDTO requestDTO) {
        ExpenseResponseDTO expense = expenseService.updateExpense(id, requestDTO);
        return ResponseEntity.ok(expense);
    }

    /**
     * Delete an expense
     * 
     * @param id the expense id
     * @return 204 No Content status
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Get expenses by category
     * 
     * @param category the category name
     * @return list of expenses in the category
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ExpenseResponseDTO>> getExpensesByCategory(@PathVariable String category) {
        List<ExpenseResponseDTO> expenses = expenseService.getExpensesByCategory(category);
        return ResponseEntity.ok(expenses);
    }

    /**
     * Get expenses within a date range
     * 
     * @param startDate the start date
     * @param endDate   the end date
     * @return list of expenses within the date range
     */
    @GetMapping("/date-range")
    public ResponseEntity<List<ExpenseResponseDTO>> getExpensesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<ExpenseResponseDTO> expenses = expenseService.getExpensesByDateRange(startDate, endDate);
        return ResponseEntity.ok(expenses);
    }

    /**
     * Search expenses by title
     * 
     * @param title the title to search for
     * @return list of matching expenses
     */
    @GetMapping("/search")
    public ResponseEntity<List<ExpenseResponseDTO>> searchExpensesByTitle(
            @RequestParam String title) {
        List<ExpenseResponseDTO> expenses = expenseService.searchExpensesByTitle(title);
        return ResponseEntity.ok(expenses);
    }

    /**
     * Health check endpoint
     * 
     * @return OK status
     */
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Expense Tracker API is running");
    }
}