var tagsDisabled = false;
var maxTags = 3;

function checkForMaximumTags() {
    if ($('._tag_list ._tag.active').length >= maxTags) {
        tagsDisabled = true;

        $('._tag_list ._tag').not('.active').addClass('disabled');
    } else {
        tagsDisabled = false;
        $('._tag_list ._tag.disabled').removeClass('disabled');
    }
}

function showTagDescriptions() {
    var checkedTags = $('._tag input:checked');
    var descriptionArea = $('._tag_descriptions');
    var descriptions = [];

    checkedTags.each(function() {
        var tagDescription = $(this).parent().find('._description').text();
        descriptions.push(tagDescription);
    });

    if (descriptions.length == 0) {
        $('._tag_description_container').hide();
        return;
    }

    $('._tag_description_container').show();
    $('._tag_descriptions').text('');

    for (var i in descriptions) {
        $('._tag_descriptions').append("<li>" + descriptions[i] + "</li>");
    }
}

function updateTagDisplay() {
    $('._tag_list ._tag').removeClass('active');
    var tagInputs = $('._tags').find('input');

    tagInputs.each(function() {
        var tag = $(this).attr('title');
        if ($(this).prop('checked')) {
            $('a._tag[title=' + tag + ']').addClass('active');
        }
    });

    checkForMaximumTags();
    showTagDescriptions();
}

function toggleTag(tagText) {
    var checkbox = $('._tags ._tag[title=' + tagText + '] input');

    if (checkbox.prop('checked')) {
        checkbox.prop('checked', false);
    } else {
        checkbox.prop('checked', true);
    }

    updateTagDisplay();
}

function bindTagChooser() {
    // each click of a tag link togs the tag
    $('a._tag').click(function(e) {
        e.preventDefault();
        if ( ! $(this).hasClass('disabled')) {
            toggleTag($(this).text());
        }
    });

    // set up initial state
    updateTagDisplay();
}

function versionSelectToTag() {
    var versionTags = $('.version').find('input');

    versionTags.each(function() {
        if ($(this).prop('checked')) {
            $(this).closest('label').addClass('selected');
        }
    });

    $('.version input').change(function() {
        $('.version .selected').removeClass('selected');
        $(this).closest('label').addClass('selected');
    })
}

function formatForumQuote(quote)
{
    quote = quote.replace(/^/g, ">");
    return quote.replace(/\n/g, "\n>");
}

function bindQuoteLinks()
{
    $('._quote_forum_post').click(function(e) {
        e.preventDefault();

        var replyForm = $('._reply_form');
        var quoteBody = $(this).closest('.comment').find('._quote_body');

        var quoteText = formatForumQuote(quoteBody.text());
        replyForm.val(replyForm.val() + quoteText);
    });
}

$(function() {
    bindTagChooser();
    versionSelectToTag();
    bindQuoteLinks();
});