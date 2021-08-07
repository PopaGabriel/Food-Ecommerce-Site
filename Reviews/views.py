from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import (CreateView,
                                  DeleteView,
                                  UpdateView)
from .models import Review
from .forms import BaseReviewForm


class AddReview(LoginRequiredMixin, CreateView):
    model = Review
    form_class = BaseReviewForm
    template_name = 'reviews/add_review_form.html'

    def form_valid(self, form):
        form.instance.author = self.request.user
        form.instance.restaurant_id = self.kwargs['pk']
        return super().form_valid(form)


class UpdateReview(LoginRequiredMixin, UpdateView):
    model = Review
    form_class = BaseReviewForm
    template_name = 'reviews/update_review_form.html'


class DeleteReview(LoginRequiredMixin, DeleteView):
    model = Review
    template_name = 'reviews/delete_review.html'

    def get_success_url(self):
        return reverse_lazy('home')
