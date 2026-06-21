package com.ex.expense_tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Data Transfer Object for Expense requests
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExpenseRequestDTO {
    private String title;
    private Double amount;
    private String category;
    private LocalDate date;
}
