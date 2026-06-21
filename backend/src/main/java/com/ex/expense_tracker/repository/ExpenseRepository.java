package com.ex.expense_tracker.repository;

import com.ex.expense_tracker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository for Expense entity providing database operations
 */
@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    /**
     * Find all expenses between two dates
     * 
     * @param startDate the start date
     * @param endDate   the end date
     * @return list of expenses within the date range
     */
    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);

    /**
     * Find all expenses by category
     * 
     * @param category the category name
     * @return list of expenses in the specified category
     */
    List<Expense> findByCategory(String category);

    /**
     * Find all expenses by title (case-insensitive)
     * 
     * @param title the title to search for
     * @return list of matching expenses
     */
    List<Expense> findByTitleContainingIgnoreCase(String title);
}
