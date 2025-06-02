import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },

  {
    path: 'blog',
    title: 'Bog',
    loadComponent: () =>
      import('./components/blog/blog.component').then((c) => c.BlogComponent),
  },

  {
    path: 'main',
    title: 'Main',
    loadComponent: () =>
      import('./layout/main/main.component').then((c) => c.MainComponent),
    children: [
      {
        path: 'about-us',
        title: 'About Us',
        loadComponent: () =>
          import('./components/about-us/about-us.component').then(
            (c) => c.AboutUsComponent
          ),
      },

      {
        path: '',
        loadComponent: () =>
          import('./layout/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'welcome-message',
        loadComponent: () =>
          import(
            './Pages/About/welcome-message/welcome-message.component'
          ).then((c) => c.WelcomeMessageComponent),
      },

      {
        path: 'mission-vision',
        loadComponent: () =>
          import(
            './Pages/About/vission-mission/vission-mission.component'
          ).then((c) => c.VissionMissionComponent),
      },

      {
        path: 'organization-structure',
        loadComponent: () =>
          import(
            './Pages/About/organization-structure/organization-structure.component'
          ).then((c) => c.OrganizationStructureComponent),
      },
      {
        path: 'administrative-hr',
        loadComponent: () =>
          import(
            './Pages/Department/administration-hr/administration-hr.component'
          ).then((c) => c.AdministrationHrComponent),
      },

      {
        path: 'altanativemedicine',
        loadComponent: () =>
          import(
            './Pages/Department/altanative-medicine/altanative-medicine.component'
          ).then((c) => c.AltanativeMedicineComponent),
      },

      {
        path: 'cgcl',
        loadComponent: () =>
          import('./Pages/Department/cgcl/cgcl.component').then(
            (c) => c.CgclComponent
          ),
      },

      {
        path: 'chief-pharmacist',
        loadComponent: () =>
          import(
            './Pages/Department/cheif-pharmacist/cheif-pharmacist.component'
          ).then((c) => c.CheifPharmacistComponent),
      },

      {
        path: 'curretive',
        loadComponent: () =>
          import('./Pages/Department/curretive/curretive.component').then(
            (c) => c.CurretiveComponent
          ),
      },
      {
        path: 'medical-store',
        loadComponent: () =>
          import(
            './Pages/Department/medical-store/medical-store.component'
          ).then((c) => c.MedicalStoreComponent),
      },

      {
        path: 'mhh',
        loadComponent: () =>
          import('./Pages/Department/mhh/mhh.component').then(
            (c) => c.MhhComponent
          ),
      },

      {
        path: 'nursing-midwifery',
        loadComponent: () =>
          import(
            './Pages/Department/nursing-midwifery/nursing-midwifery.component'
          ).then((c) => c.NursingMidwiferyComponent),
      },

      {
        path: 'planning',
        loadComponent: () =>
          import('./Pages/Department/planning/planning.component').then(
            (c) => c.PlanningComponent
          ),
      },

      {
        path: 'preventive-health-education',
        loadComponent: () =>
          import(
            './Pages/Department/preventive-health-education/preventive-health-education.component'
          ).then((c) => c.PreventiveHealthEducationComponent),
      },

      {
        path: 'zfda',
        loadComponent: () =>
          import('./Pages/Department/zfda/zfda.component').then(
            (c) => c.ZfdaComponent
          ),
      },

      {
        path: 'irch',
        loadComponent: () =>
          import('./Pages/Programme/irch/irch.component').then(
            (c) => c.IrchComponent
          ),
      },
      {
        path: 'ncd',
        loadComponent: () =>
          import('./Pages/Programme/ncd/ncd.component').then(
            (c) => c.NcdComponent
          ),
      },

      {
        path: 'ntd',
        loadComponent: () =>
          import('./Pages/Programme/ntd/ntd.component').then(
            (c) => c.NtdComponent
          ),
      },

      {
        path: 'zamep',
        loadComponent: () =>
          import('./Pages/Programme/zamep/zamep.component').then(
            (c) => c.ZamepComponent
          ),
      },

      {
        path: 'zihtlp',
        loadComponent: () =>
          import('./Pages/Programme/zihtlp/zihtlp.component').then(
            (c) => c.ZihtlpComponent
          ),
      },

      {
        path: 'project',
        loadComponent: () =>
          import('./Pages/Projects/project/project.component').then(
            (c) => c.ProjectComponent
          ),
      },

      {
        path: 'tender',
        loadComponent: () =>
          import('./Pages/Tenders/tender/tender.component').then(
            (c) => c.TenderComponent
          ),
      },

      {
        path: 'blog',
        loadComponent: () =>
          import('./Pages/Blogs/blog/blog.component').then(
            (c) => c.BlogComponent
          ),
      },

      {
        path: 'team-leader',
        loadComponent: () =>
          import(
            './components/TeamLeader/team-leader/team-leader.component'
          ).then((c) => c.TeamLeaderComponent),
      },

      {
        path: 'health',
        loadComponent: () =>
          import(
            './components/our-service/health-registration-lecenses/health-registration-lecenses.component'
          ).then((c) => c.HealthRegistrationLecensesComponent),
      },

      {
        path: 'vaccination',
        loadComponent: () =>
          import(
            './components/our-service/vaccinations/vaccinations.component'
          ).then((c) => c.VaccinationsComponent),
      },

      {
        path: 'preventive-health',
        loadComponent: () =>
          import(
            './components/our-service/preventive-health-education/preventive-health-education.component'
          ).then((c) => c.PreventiveHealthEducationComponent),
      },

      {
        path: 'contact-us',
        loadComponent: () =>
          import('./Pages/Contacts/contact/contact.component').then(
            (c) => c.ContactComponent
          ),
      },

      {
        path: 'publications',
        loadComponent: () =>
          import(
            './Pages/Publication/publication-links/publication-links.component'
          ).then((c) => c.PublicationLinksComponent),
      },
      {
        path: 'more-annoucement',
        loadComponent: () =>
          import(
            './components/annoucent/more-annoucement/more-annoucement.component'
          ).then((c) => c.MoreAnnoucementComponent),
      },
      {
        path: 'news/:id',
        loadComponent: () =>
          import(
            './components/news/read-more-news/read-more-news.component'
          ).then((c) => c.ReadMoreNewsComponent),
      },
      {
        path: 'news',
        loadComponent: () =>
          import('./components/news/news.component').then(
            (c) => c.NewsComponent
          ),
      },

      {
        path: 'partners',
        loadComponent: () =>
          import('./Pages/Partners/all-partners/all-partners.component').then(
            (c) => c.AllPartnersComponent
          ),
      },

      {
        path: 'read-our-service/:id',
        loadComponent: () =>
          import(
            './components/our-service/read-more-services/read-more-services.component'
          ).then((c) => c.ReadMoreServicesComponent),
      },

      {
        path: 'read-events/:id',
        loadComponent: () =>
          import(
            './components/read-more-events/read-more-events.component'
          ).then((c) => c.ReadMoreEventsComponent),
      },

      {
        path: 'more-service',
        loadComponent: () =>
          import(
            './components/our-service/more-service/more-service.component'
          ).then((c) => c.MoreServiceComponent),
      },

      {
        path: 'all-news',
        loadComponent: () =>
          import('./components/news/all-news/all-news.component').then(
            (c) => c.AllNewsComponent
          ),
      },

      {
        path: 'all-events',
        loadComponent: () =>
          import('./components/all-events/all-events.component').then(
            (c) => c.AllEventsComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TempRoutingModule {}
