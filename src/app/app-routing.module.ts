import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'course/:id/trainings',
    loadChildren: () => import('./page/lesson/lesson.module').then( m => m.LessonPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./page/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./page/register/register.module').then( m => m.RegisterPageModule)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'training/:id',
    loadChildren: () => import('./page/training/training.module').then( m => m.TrainingPageModule)
  },
  {
    path: 'quiz',
    loadChildren: () => import('./page/quiz/quiz.module').then( m => m.QuizPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
