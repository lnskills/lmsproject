from django.db import models
from django.core import serializers
# Create your models here.
class Teacher(models.Model):
    full_name= models.CharField(max_length=100)
    detail=models.TextField(null=True)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=100)
    mobile_device = models.CharField(max_length=100)
    skills=models.TextField(null=True)

    class Meta:
        verbose_name_plural="1. Teacher"
    
    def skill_list(self):
        skill_list = self.skills.split(',')
        return skill_list
    
    def total_teacher_courses(self):
        total_courses = Course.objects.filter(teacher=self).count()
        return total_courses
    
    def total_teacher_chapters(self):
        total_chapters = Chapter.objects.filter(course__teacher=self).count()
        return total_chapters
    
    def total_teacher_students(self):
        total_students = StudentCourseEnrollment.objects.filter(course__teacher=self).count()
        return total_students
    

class CourseCategory(models.Model):
    title= models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        verbose_name_plural="2. Course Categories"
    
    def __str__(self):
        return self.title

class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE,related_name='teacher_courses') 
    title= models.CharField(max_length=100)
    description = models.TextField()
    featured_img = models.ImageField(upload_to='course_imgs/',null=True)
    techs = models.TextField(null=True)


    class Meta:
        verbose_name_plural="3. Course"
    
    def related_videos(self):
        related_videos=Course.objects.filter(techs=self.techs).exclude(id=self.id)
        return serializers.serialize('json',related_videos)
    
    def total_enrolled_students(self):
        total_enrolled_students= StudentCourseEnrollment.objects.filter(course=self).count()
        return total_enrolled_students
    
    def tech_list(self):
        tech_list = self.techs.split(',')
        return tech_list

class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE,related_name='course_chapters')
    title= models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to='chapter_videos/',null=True)
    remarks = models.TextField()


    class Meta:
        verbose_name_plural="4. Chapter"
        

class Student(models.Model):
    full_name= models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    mobile_device = models.CharField(max_length=100)
    address=models.TextField()
    interested_categories = models.TextField()
    def __str__(self):
        return self.full_name
    class Meta:
        verbose_name_plural="5. Student"

class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(Course,on_delete=models.CASCADE,related_name='enrolled_courses')
    student = models.ForeignKey(Student,on_delete=models.CASCADE,related_name='enrolled_student')
    enrolled_time = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural="6. Enrolled Courses"

    def __str__(self):
        return f"{self.course}-{self.student}"