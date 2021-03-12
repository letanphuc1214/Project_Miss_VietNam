package project_missvietnam.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.sql.Date;


@Entity
@Table(name = "candidates")
@Where(clause = "delete=false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 4, max = 150, message = "Họ tên không được ít hơn 4 kí tự hoặc dài hơn 150 kí tự")
    @Pattern(regexp = "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\\W|_]+$",message = "Họ và tên không phù hợp")
    private String fullName;

    @NotNull (message = "Tuổi phải từ 18 tuổi đến 27 tuổi")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date dateOfBirth;


    @NotNull
    @Size(min = 3, max = 200, message = "Địa chỉ cư trú không được ít hơn 3 kí tự hoặc dài hơn 200 kí tự")
//    @Pattern(regexp = "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\\W|_]+$",message = "Địa chỉ cư trú không phù hợp")
    private String residentialAddress;

    @NotNull
    @Size(min = 3, max = 200, message = "Địa chỉ liên lạc không được ít hơn 3 kí tự hoặc dài hơn 200 kí tự")
//    @Pattern(regexp = "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\\W|_]+$",message = "Địa chỉ liên lạc không phù hợp")
    private String contactAddress;

    @NotBlank
    @Size(min=10, max=10)
    @Pattern(regexp = "^(08|09|03|07|)([0-9]{8})$", message = "Số điện thoại không đúng định dạng")
    private String phone;

    @NotBlank
    @Pattern(regexp = "^[a-z][a-z0-9_\\.]{5,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$", message = "Email không đúng định dạng")
    private String email;

    @NotBlank
    @Pattern(regexp = "^([0-9]{9,10})$", message = "Chứng minh thư không đúng định dạng")
    private String idCard;

    @NotNull
    @Size(min = 3, max = 45, message = "Nghề nghiệp không được ít hơn 3 kí tự hoặc dài hơn 45 kí tự")
    @Pattern(regexp = "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\\W|_]+$",message = "Nghề nghiệp không phù hợp")
    private String job;

    @NotNull
    @Size(min = 3, max = 200, message = "Đơn vị công tác không được ít hơn 3 kí tự hoặc dài hơn 200 kí tự")
    @Pattern(regexp = "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\\W|_]+$",message = "Đơn vị công tác không phù hợp")
    private String workUnit;

    @NotNull
    @Min(value = 163, message = "Chiều cao không được thấp hơn 1m63")
    @Max(value = 250, message ="Chiều cao không được cao hơn 2m50")
    private float height;

    @NotNull
    @Min(value = 30, message = "Cân nặng không được dưới 30kg")
    @Max(value = 70, message ="Cân nặng không được quá 70kg")
    private float weight;

    @NotNull
    @Size(min = 3, max = 100, message = "Năng khiếu không được ít hơn 3 kí tự hoặc quá 100 kí tự")
    @Pattern(regexp = "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\\W|_]+$",message = "Tên năng khiếu không đúng định dạng")
    private String gifted;

    @NotNull
    @Column(name="avatar",columnDefinition="TEXT")
    private String avatar;

    private String status = "Chờ duyệt";

    @Where(clause = "delete=false")
    private boolean delete = false;

    @ManyToOne
    @JoinColumn(name = "province_id")
    private Province province;

    @ManyToOne
    @JoinColumn(name = "education_id")
    private Education education;

    @ManyToOne
    @JoinColumn(name = "ethnicity_id")
    private Ethnicity ethnicity;
}
