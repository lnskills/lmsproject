from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.generics import RetrieveAPIView
from rest_framework import permissions
from .serializers import TeacherSerializer,CategorySerializer,CourseSerializer,ChapterSerializer,StudentSerializer,StudentCourseEnrollSerializer,TeacherDashboardSerializer
from . import models
# Create your views here.

class TeacherList(generics.ListCreateAPIView):
    queryset= models.Teacher.objects.all()
    serializer_class=TeacherSerializer

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset= models.Teacher.objects.all()
    serializer_class=TeacherSerializer
    # permission_classes=[permissions.IsAuthenticated]

class TeacherDashboard(generics.RetrieveAPIView):
    queryset=models.Teacher.objects.all()
    serializer_class= TeacherDashboardSerializer

@csrf_exempt
def teacher_login(request):
    email = request.POST['email']
    password=request.POST['password']
    teacherData = models.Teacher.objects.get(email=email,password=password)
    if teacherData:
        return JsonResponse({'bool':True,'teacher_id':teacherData.id})
    else:
        return JsonResponse({'bool':False})

class CategoryList(generics.ListCreateAPIView):
    queryset= models.CourseCategory.objects.all()
    serializer_class=CategorySerializer 

class CourseList(generics.ListCreateAPIView):
    queryset= models.Course.objects.all()
    serializer_class=CourseSerializer 
    def get_queryset(self):
        qs=super().get_queryset()
        if 'result' in self.request.GET:
            limit=int(self.request.GET['result'])
            qs=models.Course.objects.all().order_by('-id')[:limit]

        if 'category' in self.request.GET:
            category=self.request.GET['category']
            qs=models.Course.objects.filter(category=category)

        # if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
        #     skill_name=self.request.GET['skill_name']
        #     teacher=self.request.GET['teacher']
        #     teacher=models.Teacher.objects.filter(id=teacher).first()
        #     qs=models.Course.objects.filter(skill_name=skill_name,teacher=teacher)
        return qs
 
class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class=CourseSerializer 
    def get_queryset(self):
        teacher_id=self.kwargs['teacher_id']
        teacher=models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)

class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class= CourseSerializer
    
class ChapterList(generics.ListCreateAPIView):
    queryset= models.Chapter.objects.all()
    serializer_class=ChapterSerializer 

class CourseChapterList(generics.ListAPIView):
    serializer_class=ChapterSerializer 
    def get_queryset(self):
        course_id=self.kwargs['course_id']
        course= models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)

class CourseDetailView(generics.RetrieveAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer

class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Chapter.objects.all()
    serializer_class=ChapterSerializer
    

class StudentList(generics.ListCreateAPIView):
    # def get(self,request):
    #     teachers=models.Teacher.objects.all()
    #     serializers = TeacherSerializer(teachers, many=True)
    #     return Response(serializers.data)
    queryset= models.Student.objects.all()
    serializer_class=StudentSerializer
    # permission_classes=[permissions.IsAuthenticated]


@csrf_exempt
def student_login(request):
    email = request.POST['email']
    password=request.POST['password']
    try:
        studentData = models.Student.objects.get(email=email,password=password)
    except models.Student.DoesNotExist:
        studentData = None
    if studentData:
        return JsonResponse({'bool':True,'student_id':studentData.id})
    else:
        return JsonResponse({'bool':False})

class StudentEnrollCourserList(generics.ListCreateAPIView):
    queryset= models.StudentCourseEnrollment.objects.all()
    serializer_class=StudentCourseEnrollSerializer

def fetch_enroll_status(request,student_id,course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    enrollStatus = models.StudentCourseEnrollment.objects.filter(course=course,student=student).count()

    if enrollStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

class EnrolledStudentrList(generics.ListAPIView):
    queryset= models.StudentCourseEnrollment.objects.all()
    serializer_class=StudentCourseEnrollSerializer
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id=self.kwargs['course_id']
            course= models.Course.objects.get(pk=course_id)
            return models.StudentCourseEnrollment.objects.filter(course=course)
        elif 'teacher_id' in self.kwargs:
            teacher_id=self.kwargs['teacher_id']
            teacher= models.Teacher.objects.get(pk=teacher_id)
            return models.StudentCourseEnrollment.objects.filter(course__teacher=teacher).distinct()