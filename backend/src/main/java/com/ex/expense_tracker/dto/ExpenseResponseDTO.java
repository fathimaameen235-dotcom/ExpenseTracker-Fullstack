package com.ex.expense_tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Data Transfer Object for Expense responses
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExpenseResponseDTO {
    private Long id;
    private String title;
    private Double amount;
    private String category;
    private LocalDate date;
    private LocalDate createdAt;
}
