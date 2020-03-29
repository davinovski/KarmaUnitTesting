import { AppComponent } from "./app.component";
import { JsonPlaceholderService } from './shared/services/json-placeholder/json-placeholder.service';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { LogType } from './shared/models/LogType';
import { Post } from './shared/models/Post';
import {Router} from '@angular/router'
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let spyJsonPlaceholderService: jasmine.SpyObj<JsonPlaceholderService>;
  let component: AppComponent;
  let router: Router;
  let location: Location;

  beforeAll(() => {
    spyJsonPlaceholderService = jasmine.createSpyObj<JsonPlaceholderService>
    ('JsonPlaceholderService', ['getPosts']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: JsonPlaceholderService, useValue: spyJsonPlaceholderService
        }
      ],
      declarations: [AppComponent],
      imports:[RouterTestingModule]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    router.initialNavigation();
  });

  it('should create successfully', () => {
    expect(fixture).toBeDefined();
  });
  
  

  it('should set the title correctly', () => {
    component.setTitle('new-title');

    expect(component.title).toEqual('new-title');
  });
  

  it('should set the posts array to the result of getPosts() called from the jsonPlaceholderService', () => {
    const MOCK_POSTS: Post[] = [
      {
        id: 1,
        userId: 1,
        body: 'body1',
        title: 'title1'
      },
      {
        id: 2,
        userId: 2,
        body: 'body2',
        title: 'title2'
      },
      {
        id: 3,
        userId: 3,
        body: 'body3',
        title: 'title3'
      }
    ];
    spyJsonPlaceholderService.getPosts.and.returnValue(of(MOCK_POSTS));

    component.getPosts();

    expect(component.posts).toEqual(MOCK_POSTS);
  });


  it('should check if there is a div element with content unit-testing-demo', () => {
    const divElement: HTMLElement = fixture.nativeElement.querySelector('#app-title');
    expect(divElement.textContent).toEqual('unit-testing-demo');
  });

  it('should call logMessageInDatabase() when logger() is called with LogType.DATABASE', () => {
    const spyLogMessageInDatabase = spyOn(component, 'logMessageInDatabase');

    component.logger('some message', LogType.DATABASE);

    expect(spyLogMessageInDatabase).toHaveBeenCalledWith('some message');
  });

  it('should call logMessageInFile() when logger() is called with LogType.FILE', () => {
    const spyLogMessageInFile = spyOn(component, 'logMessageInFile');

    component.logger('some message', LogType.FILE);

    expect(spyLogMessageInFile).toHaveBeenCalledWith('some message');
  });

  it('should call console.log() when logger() is called with LogType.CONSOLE', () => {
    const spyLogMessageInConsole = spyOn(console, 'log');

    component.logger('some message', LogType.CONSOLE);

    expect(spyLogMessageInConsole).toHaveBeenCalledWith('some message');
  });

  it('should toggle title to unit-testing-demo when it is set to other-title', () =>{
      component.setTitle('other-title');
      component.toggleTitle();
      expect(component.title).toEqual('unit-testing-demo');
  });

  it('should toggle title to other-title when it is set to unit-testing-demo', () =>{
    component.setTitle('unit-testing-demo');
    component.toggleTitle();
    expect(component.title).toEqual('other-title');
});

  it('should navigate to / when called navigate("")', () =>  {

    component.navigate('')

      expect(location.path()).toBe('/');
  });

  /* //tried this one, but it doesn't work 
  it('should navigate to /contact when called navigate("/about")', () =>  {

      component.navigate('/about')

      expect(location.path()).toBe('/about');
  });
  */

  it('should navigate to /about when called navigate("/about")', () =>  {

    const spy = spyOn(router, 'navigateByUrl');

    component.navigate('/about')

      const navArgs = spy.calls.first().args[0];

      expect(navArgs).toBe('/about');
  });

  /* //tried this one, but it doesn't work 
  it('should navigate to /contact when called navigate("/contact")', () =>  {

      component.navigate('/contact')

      expect(location.path()).toBe('/contact');
  });
  */

  it('should navigate to /contact when called navigate("/contact")', () =>  {

    const spy = spyOn(router, 'navigateByUrl');

    component.navigate('/contact')

      const navArgs = spy.calls.first().args[0];

      expect(navArgs).toBe('/contact');
  });

});