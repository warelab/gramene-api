package Grm::API;

use Mojo::Base 'Mojolicious';

# This method will run once at server start
sub startup {
    my $self = shift;

    $self->plugin('tt_renderer');

    # Documentation browser under "/perldoc"
    $self->plugin('PODRenderer');

    # Router
    my $r = $self->routes;

    # Normal route to controller
    $r->get('/hi')->to('example#welcome');

    $r->get('/search')->to('search#search');
}

1;