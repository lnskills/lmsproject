# Generated by Django 4.2.11 on 2024-04-06 12:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0005_alter_course_featured_img_alter_course_techs"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="student",
            options={"verbose_name_plural": "5. Student"},
        ),
        migrations.AlterField(
            model_name="course",
            name="featured_img",
            field=models.ImageField(null=True, upload_to="course_imgs/"),
        ),
        migrations.AlterField(
            model_name="course",
            name="techs",
            field=models.TextField(null=True),
        ),
        migrations.CreateModel(
            name="Chapter",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=150)),
                ("description", models.TextField()),
                ("video", models.FileField(null=True, upload_to="chapter_videos/")),
                ("remarks", models.TextField(null=True)),
                (
                    "course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="main.course"
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "4. Chapter",
            },
        ),
    ]
