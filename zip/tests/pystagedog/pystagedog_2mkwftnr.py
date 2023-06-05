# pystagedog_2mkwftnr (pyStage, converted from Scratch 3)

from pystage.en import Sprite, Stage

stage = Stage()
stage.add_backdrop('backdrop1')
stage.create_variable('my variable')
dot = stage.add_a_sprite(None)
dot.set_name("Dot")
dot.set_x(6)
dot.set_y(-36)
dot.go_to_back_layer()
dot.go_forward(1)
dot.add_costume('dot_a', center_x=52, center_y=67)
dot.add_costume('dot_b', center_x=65, center_y=67)
dot.add_costume('dot_c', center_x=50.53907324990831, center_y=68.96764494984302)
dot.add_costume('dot_d', center_x=56.58074394930321, center_y=66.76919584395038)
dot.add_sound('bark')

def when_program_starts_1(self):
    self.move(10.0)
    self.start_sound("bark")

dot.when_program_starts(when_program_starts_1)

stage.play()
