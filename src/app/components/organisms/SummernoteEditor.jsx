'use client';

import { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'summernote/dist/summernote-bs5.css';

const SummernoteEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    let $note;
    let $;
    // Dynamically import jQuery, then Bootstrap JS, then Summernote JS
    import('jquery').then(jq => {
      $ = jq.default;
      window.$ = $;
      window.jQuery = $;
      return import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }).then(() => {
      return import('summernote/dist/summernote-bs5.min.js');
    }).then(() => {
      $note = $(editorRef.current);
      $note.summernote({
        placeholder: 'Write something...',
        tabsize: 2,
        height: 200,
        focus: true,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
          ['fontname', ['fontname']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video', 'hr']],
          ['view', ['fullscreen', 'codeview', 'help']],
          ['misc', ['undo', 'redo']],
          ['custom', ['whatsapp', 'phone']]
        ],
        buttons: {
          whatsapp: function(context) {
            var ui = $.summernote.ui;
            // Create button
            var button = ui.button({
              contents: '<i class="fa fa-whatsapp"/> WhatsApp',
              tooltip: 'Insert WhatsApp Button',
              click: function () {
                var number = prompt('Enter WhatsApp number (with country code):');
                if (number) {
                  var link = `<a href="https://wa.me/${number}" target="_blank" style="color: #fff; background: #0B6D76; padding: 6px 12px; border-radius: 4px; text-decoration: none; display: inline-block;"><i class='fa fa-whatsapp'></i> WhatsApp</a>`;
                  context.invoke('editor.pasteHTML', link);
                }
              }
            });
            return button.render();
          },
          phone: function(context) {
            var ui = $.summernote.ui;
            var button = ui.button({
              contents: '<i class="fa fa-phone"/> Phone',
              tooltip: 'Insert Phone Button',
              click: function () {
                var number = prompt('Enter phone number:');
                if (number) {
                  var link = `<a href="tel:${number}" style="color: #fff; background: #007bff; padding: 6px 12px; border-radius: 4px; text-decoration: none; display: inline-block;"><i class='fa fa-phone'></i> Call</a>`;
                  context.invoke('editor.pasteHTML', link);
                }
              }
            });
            return button.render();
          }
        },
        callbacks: {
          onChange: function(contents) {
            onChange(contents);
          }
        }
      });
      // Set initial content
      $note.summernote('code', value || '');
    });

    // Cleanup
    return () => {
      if ($note && $note.summernote) {
        $note.summernote('destroy');
      }
    };
    // eslint-disable-next-line
  }, []);

  // Keep Summernote in sync if value changes from outside
  useEffect(() => {
    if (editorRef.current && window.$ && window.$(editorRef.current).summernote) {
      if (window.$(editorRef.current).summernote('code') !== value) {
        window.$(editorRef.current).summernote('code', value || '');
      }
    }
  }, [value]);

  return <div ref={editorRef} />;
};

export default SummernoteEditor;
