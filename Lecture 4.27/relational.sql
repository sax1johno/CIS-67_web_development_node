select DOB from student where id = 3;

select firstName, DOB from student where id = 3

select body from entries where id = 1

select body from entries where tag 


# Get a information about a students' classes
select description from classes where name =  
    (
        select classes from student where id = 2
    )
    

# Get all the classes from student 2    
select classID from student-classes where studentID = 2;

# Get all the students from class 3
select studentID from student-classes where classID = 3;

