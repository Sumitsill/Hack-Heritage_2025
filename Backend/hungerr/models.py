from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, User

# Custom user manager
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

# Custom User model
class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ("contributor", "Food Contributor"),
        ("collector", "Food Collector"),
        ("consumer", "Food Consumer"),
        ("volunteer", "Volunteer"),
    ]
    
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="contributor")
    email = models.EmailField(unique=True)
    
    # Django required fields
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UserManager()
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "location", "role"]

    def __str__(self):
        return f"{self.name} ({self.email})"


class Food(models.Model):
    CATEGORY_CHOICES = [
        ('prepared', 'Prepared Meals'),
        ('raw', 'Raw Ingredients'),
        ('packaged', 'Packaged Food'),
    ]

    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="foods")  
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField()
    quantity = models.PositiveIntegerField()  # number of portions
    expiry_date = models.DateField()
    address = models.CharField(max_length=500)
    pickup_instructions = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.category})"


class FoodImage(models.Model):
    food = models.ForeignKey(Food, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="food_images/")  # requires Pillow library

    def __str__(self):
        return f"Image for {self.food.title}"
    

class RTEEnrollment(models.Model):
    # Child Information
    child_name = models.CharField(max_length=255)
    child_age = models.PositiveSmallIntegerField()
    previous_schooling = models.TextField(blank=True, null=True)

    # Parent/Guardian Information
    parent_name = models.CharField(max_length=255)
    guardian_relation = models.CharField(
        max_length=50,
        choices=[
            ("parent", "Parent"),
            ("guardian", "Legal Guardian"),
            ("relative", "Relative"),
            ("ngo", "NGO Representative"),
            ("other", "Other"),
        ]
    )
    parent_phone = models.CharField(max_length=20)
    parent_email = models.EmailField(blank=True, null=True)
    address = models.TextField()

    # School Preferences & Documents
    preferred_schools = models.TextField(blank=True, null=True)
    documents = models.TextField(blank=True, null=True)
    special_needs = models.TextField(blank=True, null=True)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.child_name} ({self.parent_name})"