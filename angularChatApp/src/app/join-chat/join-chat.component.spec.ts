import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { JoinChatComponent } from './join-chat.component';

describe('JoinChatComponent', () => {
  let component: JoinChatComponent;
  let fixture: ComponentFixture<JoinChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [JoinChatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should join the chatroom when clicked join button', () => {
    spyOn(component, 'joinRoomAction'); // Spy on the joinChatRoom method
    const joinButton =
      fixture.debugElement.nativeElement.querySelector('#join-button');
    joinButton.click();
    expect(component.joinRoomAction).toHaveBeenCalled();
  });
});
