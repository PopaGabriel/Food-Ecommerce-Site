from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Comments(models.Model):
    parent_comment = models.ForeignKey('self', null=True, on_delete=models.CASCADE)
    parent_reply = models.ForeignKey('Reviews.Review', null=True, on_delete=models.CASCADE)
    comments_replies = models.ManyToManyField('self')
    author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    body = models.TextField(max_length=200)

