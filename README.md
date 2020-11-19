# TruEXAM SampleWebApp

## Design Choices  

I have chosen DJANGO for backend implementation and REACTJS for frontend, DJANGO has many functionalities built in which helps in rapid development and REACTJS on other hand provides stateful architecture in order to ensure single page design structure and has a beautiful library which i used - MaterialUI

## Assumptions

Given the time to implement the whole project, i have not implemented login/register ( auth models ) and kept it simple for design perspective. I have implemented Object Realtional mapping but not in depth as i know there exists several ManyToMany relationships but for provided time, i have kept just simple relationship as for a Student and Instructor.

## USAGE FLOW

There exists a landing page, which asks for, if you are a student or an instructor  
- If instructor, on next page, he/she can view unreviewed submissions by students and can see TaskName, details, image  
  On Clicking a submission, instructor can view the submitted image and original image, then compare them and rate the student accordingly
- If student, on next page, he/she can view tasks created by instructors, TaskName, TaskDetails and TaskImage  
  On Clicking a task, student can upload their work and these submissions will be visible to instructor

## Installation

**Python3, pip3, npm** is required for installation
```bash
$ git clone https://github.com/xpt1x/TruExamSample.git
$ cd TruExamSample
# install required dependencies
$ pip3 install -r requirements.txt
# setup DB and run server
$ python3 manage.py makemigrations
$ python3 manage.py migrate
$ python3 manage.py runserver
# running frontend server
# Open a new shell in project dir
$ cd frontend
# install required dependencies
$ npm install
$ npm run start
```  

If want to take a look at DB models, create a super admin user and have a look at admin interface
```bash
$ python3 manage.py createsuperuser
## Follow instructions
```
then visit: http://127.0.0.1:8000/admin/

`Application's backend is deployed on heroku with free dynos which cause delay in response`

