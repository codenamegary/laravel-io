@extends('layouts._two_columns_left_sidebar')

@section('sidebar')
    @include('articles._sidebar')
@stop

@section('content')
    <div class="header">
        <h1>Edit Article</h1>
    </div>
    {{ Form::model($article->resource) }}
        <section class="padding">
            @include('articles._article_form')
        </section>
    {{ Form::close() }}
@stop

@section('scripts')
    @parent
    <script src="{{ asset('javascripts/vendor/tabby.js') }}"></script>
    <script src="{{ asset('javascripts/forums.js') }}"></script>
@stop