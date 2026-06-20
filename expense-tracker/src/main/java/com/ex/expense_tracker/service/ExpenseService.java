package com.ex.expense_tracker.service;

import com.ex.expense_tracker.entity.Expense;
import com.ex.expense_tracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Long id, Expense newData) {
        Optional<Expense> existingOpt = expenseRepository.findById(id);

        if (existingOpt.isEmpty()) {
            return null;
        }

        Expense existing = existingOpt.get();
        existing.setTitle(newData.getTitle());
        existing.setAmount(newData.getAmount());
        existing.setCategory(newData.getCategory());
        existing.setDate(newData.getDate());

        return expenseRepository.save(existing);
    }

    public boolean deleteExpense(Long id) {
        if (!expenseRepository.existsById(id)) {
            return false;
        }
        expenseRepository.deleteById(id);
        return true;
    }
}