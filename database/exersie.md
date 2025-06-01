test01=# seclect _ from employees ;
ERROR: syntax error at or near "seclect"
LINE 1: seclect _ from employees ;
^
test01=# select \* from employees ;
emp_id | fname | lname | email | dept | salary | hire_date
--------+---------+----------+-------------------+-----------+----------+------------
1 | shubham | agrahari | shubham@gmail.com | it | 20000.00 | 2025-05-31
3 | raj | sharma | raj@gmail.com | hr | 20000.00 | 2025-05-31
4 | priya | singh | priya@gamil.com | finance | 20000.00 | 2025-05-31
5 | arjun | verma | arjun@gmail.com | marketing | 20000.00 | 2025-05-31
6 | mandeep | dangar | manddep@gmail.com | it | 50000.00 | 2025-05-31
7 | vaibhav | mishra | vaibhav@gmail.com | it | 80000.00 | 2025-05-31
(6 rows)

test01=# select avg(salary) from employees ;
avg

---

35000.000000000000
(1 row)

test01=# select concat('hello','world') ;
concat

---

helloworld
(1 row)

test01=# select \* from employees ;
emp_id | fname | lname | email | dept | salary | hire_date
--------+---------+----------+-------------------+-----------+----------+------------
1 | shubham | agrahari | shubham@gmail.com | it | 20000.00 | 2025-05-31
3 | raj | sharma | raj@gmail.com | hr | 20000.00 | 2025-05-31
4 | priya | singh | priya@gamil.com | finance | 20000.00 | 2025-05-31
5 | arjun | verma | arjun@gmail.com | marketing | 20000.00 | 2025-05-31
6 | mandeep | dangar | manddep@gmail.com | it | 50000.00 | 2025-05-31
7 | vaibhav | mishra | vaibhav@gmail.com | it | 80000.00 | 2025-05-31
(6 rows)

test01=# select concat(fname,lname) from employees ;
concat

---

shubhamagrahari
rajsharma
priyasingh
arjunverma
mandeepdangar
vaibhavmishra
(6 rows)

test01=# select concat(fname,lname) as FullName from employees;
fullname

---

shubhamagrahari
rajsharma
priyasingh
arjunverma
mandeepdangar
vaibhavmishra
(6 rows)

         select emp_id, concat(fname,lname) as FullName,dept from employees ;

emp_id | fullname | dept
--------+-----------------+-----------
1 | shubhamagrahari | it
3 | rajsharma | hr
4 | priyasingh | finance
5 | arjunverma | marketing
6 | mandeepdangar | it
7 | vaibhavmishra | it
(6 rows)

test01=# select concat_ws('-',fname,lname) as fullName ,dept from employees ;
fullname | dept
------------------+-----------
shubham-agrahari | it
raj-sharma | hr
priya-singh | finance
arjun-verma | marketing
mandeep-dangar | it
vaibhav-mishra | it
(6 rows)

test01=# select distinct dept from employees ;
dept

---

finance
hr
it
marketing
(4 rows)

test01=# select salary from employees between 20000 and 30000;
ERROR: syntax error at or near "20000"
LINE 1: select salary from employees between 20000 and 30000;
^
test01=# select max salary from employees ;
ERROR: column "max" does not exist
LINE 1: select max salary from employees ;
^
test01=# select max(salary) from employees ;
max

---

80000.00
(1 row)

test01=# select min(salary) from employees ;
min

---

20000.00
(1 row)

test01=# select _ from salary from employees order by desc ;
ERROR: syntax error at or near "from"
LINE 1: select _ from salary from employees order by desc ;
^
test01=# select salary from employees order by desc ;d
ERROR: syntax error at or near "desc"
LINE 1: select salary from employees order by desc ;
^
test01-# select salary from employees order by desc ;
ERROR: syntax error at or near "d"
LINE 1: d
^
test01=# select _ from employees where salary orderby desc ;
ERROR: syntax error at or near "orderby"
LINE 1: select _ from employees where salary orderby desc ;
^
test01=# select _ from employees orderby salary desc ;
ERROR: syntax error at or near "salary"
LINE 1: select _ from employees orderby salary desc ;
^
test01=# select \* from employees order by salary desc ;
emp_id | fname | lname | email | dept | salary | hire_date
--------+---------+----------+-------------------+-----------+----------+------------
7 | vaibhav | mishra | vaibhav@gmail.com | it | 80000.00 | 2025-05-31
6 | mandeep | dangar | manddep@gmail.com | it | 50000.00 | 2025-05-31
1 | shubham | agrahari | shubham@gmail.com | it | 20000.00 | 2025-05-31
3 | raj | sharma | raj@gmail.com | hr | 20000.00 | 2025-05-31
4 | priya | singh | priya@gamil.com | finance | 20000.00 | 2025-05-31
5 | arjun | verma | arjun@gmail.com | marketing | 20000.00 | 2025-05-31
(6 rows)

test01=# select \* from employees order by salary desc limit 3 ;
emp_id | fname | lname | email | dept | salary | hire_date
--------+---------+----------+-------------------+------+----------+------------
7 | vaibhav | mishra | vaibhav@gmail.com | it | 80000.00 | 2025-05-31
6 | mandeep | dangar | manddep@gmail.com | it | 50000.00 | 2025-05-31
1 | shubham | agrahari | shubham@gmail.com | it | 20000.00 | 2025-05-31
(3 rows)

test01=# select _ from employees where fname like=%a ;
ERROR: column "a" does not exist
LINE 1: select _ from employees where fname like=%a ;
^
test01=# select _ from employees where fname like='%a ;
test01'# select _ from employees where fname like='%a' ;
test01'# \q

C:\Users\SKY>

C:\Users\SKY>psql -U postgres
Password for user postgres:

psql (17.5)
WARNING: Console code page (437) differs from Windows code page (1252)
8-bit characters might not work correctly. See psql reference
page "Notes for Windows users" for details.
Type "help" for help.

postgres=# \c test01
You are now connected to database "test01" as user "postgres".
test01=#
test01=#
test01=# select \* from employees where fname like 'a%' ;
emp_id | fname | lname | email | dept | salary | hire_date
--------+-------+-------+-----------------+-----------+----------+------------
5 | arjun | verma | arjun@gmail.com | marketing | 20000.00 | 2025-05-31
(1 row)

test01=# select \* from employees where length(lname) = 4 ;
emp_id | fname | lname | email | dept | salary | hire_date
--------+-------+-------+-------+------+--------+-----------
(0 rows)

test01=# select \* from employees where length(lname) = 6 ;
emp_id | fname | lname | email | dept | salary | hire_date
--------+---------+--------+-------------------+------+----------+------------
3 | raj | sharma | raj@gmail.com | hr | 20000.00 | 2025-05-31
6 | mandeep | dangar | manddep@gmail.com | it | 50000.00 | 2025-05-31
7 | vaibhav | mishra | vaibhav@gmail.com | it | 80000.00 | 2025-05-31
(3 rows)

test01=# select count(emp_id) from employees ;
count

---

     6

(1 row)

test01=# lowest and highedt salary paying
test01-# ;
ERROR: syntax error at or near "lowest"
LINE 1: lowest and highedt salary paying
^
test01=# select \* from employees where salary=(select max(salary) from employees) ;
emp_id | fname | lname | email | dept | salary | hire_date
--------+---------+--------+-------------------+------+----------+------------
7 | vaibhav | mishra | vaibhav@gmail.com | it | 80000.00 | 2025-05-31
(1 row)

test01=# select \* from employees where salary=(select min(salary) from employees) ;
emp_id | fname | lname | email | dept | salary | hire_date
--------+---------+----------+-------------------+-----------+----------+------------
1 | shubham | agrahari | shubham@gmail.com | it | 20000.00 | 2025-05-31
3 | raj | sharma | raj@gmail.com | hr | 20000.00 | 2025-05-31
4 | priya | singh | priya@gamil.com | finance | 20000.00 | 2025-05-31
5 | arjun | verma | arjun@gmail.com | marketing | 20000.00 | 2025-05-31
(4 rows)

test01=#
test01=#
test01=#
test01=#
test01=#
test01=#
test01=#
test01=#
test01=#
test01=#
test01=#
test01=# select sum(salary) from employees where dept='hr';
sum

---

20000.00
(1 row)

test01=# select sum(salary) from employees where dept='it';
sum

---

150000.00
(1 row)

test01=# select \* from employees ;
emp_id | fname | lname | email | dept | salary | hire_date
--------+---------+----------+-------------------+-----------+----------+------------
1 | shubham | agrahari | shubham@gmail.com | it | 20000.00 | 2025-05-31
3 | raj | sharma | raj@gmail.com | hr | 20000.00 | 2025-05-31
4 | priya | singh | priya@gamil.com | finance | 20000.00 | 2025-05-31
5 | arjun | verma | arjun@gmail.com | marketing | 20000.00 | 2025-05-31
6 | mandeep | dangar | manddep@gmail.com | it | 50000.00 | 2025-05-31
7 | vaibhav | mishra | vaibhav@gmail.com | it | 80000.00 | 2025-05-31
(6 rows)

test01=# select sum(salary) from employees where dept='it';
sum

---

150000.00
(1 row)

test01=# select dept , avg(salary) from employess ;
ERROR: relation "employess" does not exist
LINE 1: select dept , avg(salary) from employess ;
^
test01=# select dept , avg(salary) from employees ;
ERROR: column "employees.dept" must appear in the GROUP BY clause or be used in an aggregate function
LINE 1: select dept , avg(salary) from employees ;
^
test01=# select avg(salary) distinct dept from employees ;
ERROR: syntax error at or near "dept"
LINE 1: select avg(salary) distinct dept from employees ;
^
test01=# select dept , avg(salary) as average_salary
test01-# from employees
test01-# group by employees ;
ERROR: column "employees.dept" must appear in the GROUP BY clause or be used in an aggregate function
LINE 1: select dept , avg(salary) as average_salary
^
test01=# select dept, avg(salary) as average_salary
test01-# from employees
test01-# select _ from employees where salary=(select max(salary) from employees) ;;
ERROR: syntax error at or near "select"
LINE 3: select _ from employees where salary=(select max(salary) fro...
^
test01=# select dept, avg(salary) as average_salary
test01-# from employees
test01-# group by dept ;
dept | average_salary
-----------+--------------------
finance | 20000.000000000000
marketing | 20000.000000000000
it | 50000.000000000000
hr | 20000.000000000000
