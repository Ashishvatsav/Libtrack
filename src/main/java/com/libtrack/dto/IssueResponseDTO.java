package com.libtrack.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IssueResponseDTO {

    private Long issueId;
    private LocalDate issueDate;
    private LocalDate returnDate;
    private Long bookId;
    private String bookTitle;
    private Long memberId;
    private String memberName;
}
