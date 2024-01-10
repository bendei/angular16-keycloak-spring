/// <reference types="@angular/localize" />

import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {HttpClientModule} from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";
import {provideRouter, PreloadAllModules, withDebugTracing, withPreloading} from "@angular/router";
import {TemplateComponent} from "./app/core/template.component";
import {NavigationErrorComponent} from "./app/core/navigationerror.component";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule), // importing providers from modules usually

    // we add routes to the bootstrapApplication configuration
    provideRouter([
        {
        path: 'navigation',
          loadChildren: () => import('./app/core/navigation.routing').then(r => r.NAVIGATION_ROUTES)
          // lazy loading  navigation child routes
          // we set loadChildren property to a dynamic function, we import the file dynamically,
            // when the file/with Routes inside is loaded, we have can load/pull in our routes definitions
        },
        {
          path: 'navigationerror',
          component: NavigationErrorComponent

        },
        {path: '',    // lazy loading single standalone component
          loadComponent: ()=> import('./app/core/welcome.component').then(e => e.WelcomeComponent)
        }, // accessing with outer route
        {path: '**', component: TemplateComponent}
      ],
      withDebugTracing(),
      // withPreloading(PreloadAllModules)
    ),
    //provideRouter(navigationRoutes)
  ]
});
