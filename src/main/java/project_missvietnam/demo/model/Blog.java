package project_missvietnam.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "blogs")
@Where(clause = "delete=false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min =20,max = 200,message = "Tiêu đề bài viết không được dưới 20 hoặc quá 200 kí tự!")
    private String title;

    @NotNull
    @Size(min = 20, max = 500, message = "Nội dung tóm tắt không được dưới 20 hoặc trên 500 kí tự!")
    private String contentShort;

    @NotNull
    @Size(min =500,message = "Nội dung bài viết không được dưới 500 kí tự!")
    @Column(name="content",columnDefinition="TEXT")
    private String content;

    @NotNull
    @Column(name="image",columnDefinition="TEXT")
    private String image;


    @NotNull
    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dateAdd = LocalDateTime.now();

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dateEdit;

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dateDelete;

    @Where(clause = "delete=false")
    private boolean delete=false;
}
