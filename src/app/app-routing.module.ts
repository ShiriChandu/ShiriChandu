import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'diary',
    loadChildren: () =>
      import('./pages/diary/diary.module').then((m) => m.DiaryPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'ion-menu',
    loadChildren: () =>
      import('./pages/ion-menu/ion-menu.module').then(
        (m) => m.IonMenuPageModule
      ),
  },
  {
    path: 'project-info',
    loadChildren: () =>
      import('./pages/project-info/project-info.module').then(
        (m) => m.ProjectInfoPageModule
      ),
  },
  {
    path: 'service-request',
    loadChildren: () =>
      import('./pages/service-request/service-request.module').then(
        (m) => m.ServiceRequestPageModule
      ),
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      import('./pages/user-profile/user-profile.module').then(
        (m) => m.UserProfilePageModule
      ),
  },
  {
    path: 'project-details',
    loadChildren: () =>
      import('./pages/project-details/project-details.module').then(
        (m) => m.ProjectDetailsPageModule
      ),
  },
  {
    path: 'add-projects',
    loadChildren: () =>
      import('./pages/add-projects/add-projects.module').then(
        (m) => m.AddProjectsPageModule
      ),
  },
  {
    path: 'diaries',

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/diary/diary.module').then((m) => m.DiaryPageModule),
      },
      {
        path: ':projectId',
        loadChildren: () =>
          import('./pages/project-details/project-details.module').then(
            (m) => m.ProjectDetailsPageModule
          ),
      },
    ],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'team-members',
    loadChildren: () =>
      import('./pages/team-members/team-members.module').then(
        (m) => m.TeamMembersPageModule
      ),
  },
  {
    path: 'employees-projectwise',
    loadChildren: () =>
      import('./pages/employees-projectwise/employees-projectwise.module').then(
        (m) => m.EmployeesProjectwisePageModule
      ),
  },

  {
    path: 'employee-project',

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/team-members/team-members.module').then(
            (m) => m.TeamMembersPageModule
          ),
      },
      {
        path: ':eprojectId',
        loadChildren: () =>
          import(
            './pages/employees-projectwise/employees-projectwise.module'
          ).then((m) => m.EmployeesProjectwisePageModule),
      },
    ],
  },
  {
    path: 'calender',
    loadChildren: () => import('./pages/calender/calender.module').then( m => m.CalenderPageModule)
  },
  {
    path: 'practise',
    loadChildren: () => import('./pages/practise/practise.module').then( m => m.PractisePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
