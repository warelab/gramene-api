package Grm::API::Search;

use Mojo::Base 'Mojolicious::Controller';

use lib '/usr/local/gramene-lib/lib';
#use Grm::Search;
#use Grm::Utils qw( camel_case commify iterative_search_values timer_calc );

# This action will render a template
sub search {
    my $self     = shift;
#    my $search   = Grm::Search->new;
#    my $timer  = timer_calc();
#    my $req      = $self->req;
#    my $qry      = $req->param('qry')      or die 'No query defined';
#    my $format   = $req->param('fmt')      || 'json';
#    my $db       = $req->param('db')       || '';
#    my $category = $req->param('category') || '';
#    my $taxonomy = $req->param('taxonomy') || '';
#
#    my $res;
#    for my $t ( iterative_search_values( $qry ) ) {
#        $res         =  $search->search_mysql(
#            query    => $t, 
#            category => $category,
#            taxonomy => $taxonomy,
#            db       => $db,
#        );
#
#        last if $res->{'num_hits'} > 0;
#    }
#
#    $res->{'time'} = $timer->();

    $self->respond_to(
        json => sub {
            $self->render( json => { response => 'hi' } )
        },
        html => sub { $self->render },
    );
}

1;
