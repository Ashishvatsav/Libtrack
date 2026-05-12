package com.libtrack.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDTO {

    private Long bookId;

    @NotBlank(message = "Book title cannot be empty")
    private String title;

    @NotBlank(message = "Author name cannot be empty")
    private String author;

    private boolean availability;
}
