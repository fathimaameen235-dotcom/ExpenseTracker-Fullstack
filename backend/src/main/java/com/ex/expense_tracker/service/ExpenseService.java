package com.ex.expense_tracker.service;

import com.ex.expense_tracker.dto.ExpenseRequestDTO;
import com.ex.expense_tracker.dto.ExpenseResponseDTO;
import com.ex.expense_tracker.entity.Expense;
import com.ex.expense_tracker.exception.ExpenseNotFoundException;
import com.ex.expense_tracker.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service layer for Expense operations
 */
@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    /**
     * Get all expenses
     * 
     * @return list of all expenses
     */
    public List<ExpenseResponseDTO> getAllExpenses() {
        return expenseRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get expense by id
     * 
     * @param id the expense id
     * @return expense if found
     * @throws ExpenseNotFoundException if expense not found
     */
    public ExpenseResponseDTO getExpenseById(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense not found with id: " + id));
        return toResponseDTO(expense);
    }

    /**
     * Create a new expense
     * 
     * @param requestDTO the expense request data
     * @return the created expense
     */
    public ExpenseResponseDTO createExpense(ExpenseRequestDTO requestDTO) {
        Expense expense = Expense.builder()
                .title(requestDTO.getTitle())
                .amount(requestDTO.getAmount())
                .category(requestDTO.getCategory())
                .date(requestDTO.getDate() != null ? requestDTO.getDate() : LocalDate.now())
                .build();

        Expense savedExpense = expenseRepository.save(expense);
        return toResponseDTO(savedExpense);
    }

    /**
     * Update an existing expense
     * 
     * @param id         the expense id
     * @param requestDTO the updated expense data
     * @return the updated expense
     * @throws ExpenseNotFoundException if expense not found
     */
    public ExpenseResponseDTO updateExpense(Long id, ExpenseRequestDTO requestDTO) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense not found with id: " + id));

        expense.setTitle(requestDTO.getTitle());
        expense.setAmount(requestDTO.getAmount());
        expense.setCategory(requestDTO.getCategory());
        expense.setDate(requestDTO.getDate() != null ? requestDTO.getDate() : expense.getDate());

        Expense updatedExpense = expenseRepository.save(expense);
        return toResponseDTO(updatedExpense);
    }

    /**
     * Delete an expense
     * 
     * @param id the expense id
     * @throws ExpenseNotFoundException if expense not found
     */
    public void deleteExpense(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense not found with id: " + id));
        expenseRepository.delete(expense);
    }

    /**
     * Get expenses by category
     * 
     * @param category the category name
     * @return list of expenses in the category
     */
    public List<ExpenseResponseDTO> getExpensesByCategory(String category) {
        return expenseRepository.findByCategory(category)
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get expenses within a date range
     * 
     * @param startDate the start date
     * @param endDate   the end date
     * @return list of expenses within the date range
     */
    public List<ExpenseResponseDTO> getExpensesByDateRange(LocalDate startDate, LocalDate endDate) {
        return expenseRepository.findByDateBetween(startDate, endDate)
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Search expenses by title
     * 
     * @param title the title to search for
     * @return list of matching expenses
     */
    public List<ExpenseResponseDTO> searchExpensesByTitle(String title) {
        return expenseRepository.findByTitleContainingIgnoreCase(title)
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert Expense entity to ExpenseResponseDTO
     * 
     * @param expense the expense entity
     * @return the response DTO
     */
    private ExpenseResponseDTO toResponseDTO(Expense expense) {
        return ExpenseResponseDTO.builder()
                .id(expense.getId())
                .title(expense.getTitle())
                .amount(expense.getAmount())
                .category(expense.getCategory())
                .date(expense.getDate())
                .createdAt(expense.getCreatedAt())
                .build();
    }
}
