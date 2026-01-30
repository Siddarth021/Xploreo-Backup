import java.lang.* ;
import java.util.* ;

class customer{
    private String cust_id;
    private String cust_name;
    private Integer cust_age;
    private Date cust_dob;
    private String cust_adress;
    private Integer cust_phno;

    public void setname(String cust_name){
        this.cust_name = cust_name;
    }
    public void setage(Integer age){
        this.cust_age = age;    
    }
    
    public void setdob(Date dob){
        this.cust_dob = dob;
    }
    public void setadress(String adress){
        this.cust_adress = adress;
    }
    public void setphno(Integer phno){
        this.cust_phno = phno;
    }
}