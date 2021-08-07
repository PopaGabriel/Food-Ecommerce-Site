from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm
import CustomUsers.cnp_validator as CNP
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

User = get_user_model()


class UserRegisterForm(forms.ModelForm):
    password_2 = forms.CharField(label='Confirm Password', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['email', 'username', 'cnp', 'password']

    def clean_cnp(self) -> str:
        """
        Verifies the availability and validity of the CNP
        """
        cnp = self.cleaned_data.get('cnp')
        qs = User.objects.filter(cnp=cnp)
        if qs.exists():
            raise forms.ValidationError("cnp is taken")
        print(CNP.validation(cnp))
        if CNP.validation(cnp) != "Good CNP":
            raise forms.ValidationError("cnp is not corect")
        return cnp

    def clean_email(self) -> str:
        """
        Verify email is available.
        """

        email = self.cleaned_data.get('email')
        qs = User.objects.filter(email=email)
        if qs.exists():
            raise forms.ValidationError("email is taken")

        return email

    def clean_username(self) -> str:
        """
         Verifies the username is available
        """
        username = self.cleaned_data.get('username')
        qs = User.objects.filter(username=username)
        if qs.exists():
            raise forms.ValidationError("username is taken")

        return username

    def clean(self) -> dict:
        """
        Verify both passwords match.
        """
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        password_2 = cleaned_data.get("password_2")

        if password is not None and password != password_2:
            self.add_error("password_2", "Your passwords must match")

        return cleaned_data

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = User.objects.create_user(username=self.cleaned_data['username'],
                                        password=self.cleaned_data['password'],
                                        email=self.cleaned_data['email'],
                                        cnp=self.cleaned_data['cnp'])
        return user


class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username']

    def clean_cnp(self) -> str:
        """
        Verifies the availability and validity of the CNP
        """
        cnp = self.cleaned_data.get('cnp')
        qs = User.objects.filter(cnp=cnp)
        if qs.exists():
            raise forms.ValidationError("cnp is taken")
        if CNP.validation(cnp) != "Good CNP":
            raise forms.ValidationError("cnp is not corect")

        return cnp

    def clean_email(self) -> str:
        """
        Verify email is available.
        """

        email = self.cleaned_data.get('email')
        qs = User.objects.filter(email=email)
        if qs.exists():
            raise forms.ValidationError("email is taken")
        return email

    def clean_username(self) -> str:
        """
         Verifies the username is available
        """
        username = self.cleaned_data.get('username')
        qs = User.objects.filter(username=username)
        if qs.exists():
            raise forms.ValidationError("username is taken")
        print("Nu vad vreo problema")
        return username

    def clean(self) -> dict:
        """
        Verify both passwords match.
        """
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        password_2 = cleaned_data.get("password_2")

        if password is not None and password != password_2:
            self.add_error("password_2", "Your passwords must match")

        return cleaned_data


class UserAdminCreationForm(forms.ModelForm):
    """
    A form for creating new users. Includes all the required
    fields, plus a repeated password.
    """
    password = forms.CharField(widget=forms.PasswordInput)
    password_2 = forms.CharField(label='Confirm Password', widget=forms.PasswordInput)
    cnp = forms.CharField(label='Enter your cnp')

    class Meta:
        model = User
        fields = ['email', 'password', 'password_2', 'cnp']

    def clean_cnp(self) -> str:
        """
        Verifies the availability and validity of the CNP
        """
        cnp = self.cleaned_data.get('cnp')
        qs = User.objects.filter(cnp=cnp)
        if qs.exists():
            raise forms.ValidationError("cnp is taken")

        return cnp

    def clean_email(self) -> str:
        """
        Verify email is available.
        """

        email = self.cleaned_data.get('email')
        qs = User.objects.filter(email=email)
        if qs.exists():
            raise forms.ValidationError("email is taken")
        return email

    def clean_username(self) -> str:
        """
         Verifies the username is available
        """
        username = self.cleaned_data.get('username')
        qs = User.objects.filter(username=username)
        if qs.exists():
            raise forms.ValidationError("username is taken")
        print("Nu vad vreo problema")
        return username

    def clean(self) -> dict:
        """
        Verify both passwords match.
        """
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        password_2 = cleaned_data.get("password_2")

        if password is not None and password != password_2:
            self.add_error("password_2", "Your passwords must match")

        return cleaned_data

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = User.objects.create_user(username=self.cleaned_data['username'],
                                        password=self.cleaned_data['password'],
                                        email=self.cleaned_data['email'],
                                        cnp=self.cleaned_data['cnp'])
        return user


class UserAdminChangeForm(forms.ModelForm):
    # password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ['email', 'password']

    def clean_cnp(self) -> str:
        """
        Verifies the availability and validity of the CNP
        """
        cnp = self.cleaned_data.get('cnp')
        qs = User.objects.filter(cnp=cnp)
        if qs.exists():
            raise forms.ValidationError("cnp is taken")
        return cnp

    def clean_email(self) -> str:
        """
        Verify email is available.
        """

        email = self.cleaned_data.get('email')
        qs = User.objects.filter(email=email)
        if qs.exists():
            raise forms.ValidationError("email is taken")
        return email

    def clean_username(self) -> str:
        """
         Verifies the username is available
        """
        username = self.cleaned_data.get('username')
        qs = User.objects.filter(username=username)
        if qs.exists():
            raise forms.ValidationError("username is taken")
        print("Nu vad vreo problema")
        return username

    def clean_password(self):
        return self.initial["password"]


class UserLoginForm(AuthenticationForm):
    class Meta:
        model = User
        fields = ['email', 'password']
