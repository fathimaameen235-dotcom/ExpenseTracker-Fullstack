package com.ex.expense_tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ex.expense_tracker.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}