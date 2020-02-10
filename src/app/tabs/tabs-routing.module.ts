import { AuthGuard } from './../guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule), canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'courses',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule), canActivate: [AuthGuard]
          },
          {
            path: ':course_id',
            children: [
              {
                path: 'lesson/:lesson_id',
                children:[
                  {
                    path: '',
                    loadChildren: () => import('../page/lesson/lesson.module').then( m => m.LessonPageModule), canActivate: [AuthGuard]
                  },
                  {
                    path: 'training/:training_id',
                    loadChildren: () => import('../page/training/training.module').then( m => m.TrainingPageModule), canActivate: [AuthGuard]
                  },
                  {
                    path: 'quiz/:quiz_id',
                    loadChildren: () => import('../page/quiz/quiz.module').then( m => m.QuizPageModule), canActivate: [AuthGuard]
                  },
                ]
              },
            ]
          },
          
        ]
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule), canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab4/tab4.module').then(m => m.Tab4PageModule), canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/homepage',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/homepage',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
