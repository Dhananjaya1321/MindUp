package lk.mindup.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Positions {
    @Id
    private String position_id;
    private String company_name;
    private String position;
    private String start_date;
    private String end_date;
    private String description;

    @ManyToOne
    private User user;
}
