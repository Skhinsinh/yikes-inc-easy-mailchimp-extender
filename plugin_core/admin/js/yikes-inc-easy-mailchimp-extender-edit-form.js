(function( $ ) {	'use strict';		 $( document ).ready( function() { 	 		/* Initialize Sortable Container */		/* Sortable Form Builder - re-arrange field order (edit-form.php) */		$( 'body' ).find( '#form-builder-container' ).sortable({			update: function( ) {			  var i = 1;			  jQuery( '#form-builder-container' ).find( '.draggable' ).each( function() {					jQuery( this ).find( '.position-input' ).val( i );					i++;			  });			}		});				/* 		* Remove a field from the form builder		* re-enable it in the available fields list		*/		$( 'body' ).on( 'click' , '.remove-field' , function() {			var merge_tag = jQuery( this ).attr( 'alt' );			var clicked = jQuery( this );			$( this ).parents( '.yikes-mc-settings-expansion-section' ).prev().find( '.dashicons' ).toggleClass( 'dashicons-minus' );			$( this ).parents( '.yikes-mc-settings-expansion-section' ).slideToggle( 450 , function() {				clicked.parents( '.draggable' ).find( '.expansion-section-title' ).css( 'background' , 'rgb(255, 134, 134)' );				clicked.parents( '.draggable' ).fadeOut( 'slow' , function() {					// re-enable the field, to be added to the form					jQuery( '#available-fields' ).find( 'li[alt="'+merge_tag+'"]' ).removeClass( 'not-available' );					jQuery( '#available-interest-groups' ).find( 'li[alt="'+merge_tag+'"]' ).removeClass( 'not-available' );					// remove the element from the DOM					jQuery( this ).remove();					if( $( '#form-builder-container' ).find( '.draggable' ).length < 1 ) {						$( '#form-builder-container' ).html( '<h4 style="margin:4em 0;width:100%;text-align:center;"><em>No fields assigned to this form. Select some fields to add to this form from the right hand column.</em></h4>' );					} 				});			});			return false;		});				/* 		* Hide a field (click 'close')		*/		$( 'body' ).on( 'click' , '.hide-field' , function() {			$( this ).parents( '.yikes-mc-settings-expansion-section' ).prev().find( '.dashicons' ).toggleClass( 'dashicons-minus' );			$( this ).parents( '.yikes-mc-settings-expansion-section' ).slideToggle( 450 );			return false;		});				/* 		* Send selected field to the form builder 		* and disable it from the available fields list		*/		$( 'body' ).on( 'click' , '.add-field-to-editor' , function() {			// get the length, to decide if we should clear the html and append, or just append			var form_builder_length = $( '#form-builder-container' ).find( '.draggable' ).length;						var merge_tag = $( '.field-to-add-to-form' ).attr( 'alt' );						// temporarily disable all of the possible merge variables and interest groups (to prevent some weird stuff happening)			$( '#available-fields' ).children( 'li' ).removeClass( 'available-form-field' );			var clicked_button = $( this );			clicked_button.attr( 'disabled' , 'disabled' ).attr( 'onclick' , 'return false;' ).removeClass( 'add-field-to-editor' );						// build our data			var data = {				'action' : 'add_field_to_form',				'field_name' : $( '.field-to-add-to-form' ).attr( 'data-attr-field-name' ),				'merge_tag' : merge_tag,				'field_type' : $( '.field-to-add-to-form' ).attr( 'data-attr-field-type' ),				'list_id' : $( '.field-to-add-to-form' ).attr( 'data-attr-form-id' ) // grab the form ID to query the API for field data			};						// submit our ajax request			$.ajax({				url: object.ajax_url,				type:'POST',				data: data,				dataType: 'html',				success : function( response, textStatus, jqXHR) { 					$( '.field-to-add-to-form' ).removeClass( 'field-to-add-to-form' ).addClass( 'not-available' );					$( '.add-field-to-editor' ).hide();					if( form_builder_length < 1 ) {						$( '#form-builder-container' ).html( '' ).append( response );					} else {						$( '#form-builder-container' ).append( response );					}					// add a value to the position					$( '.field-'+merge_tag+'-position' ).val( parseInt( form_builder_length + 1 ) ); // add one :)				},				error : function( jqXHR, textStatus, errorThrown ) { 					alert( textStatus+jqXHR.status+jqXHR.responseText+"..." ); 				},				complete : function( jqXHR, textStatus ) {					console.log( 'field successfully added to the form' );					// temporarily disable all of the possible merge variables and interest groups (to prevent some weird stuff happening)					$( '#available-fields' ).children( 'li' ).addClass( 'available-form-field' );					clicked_button.removeAttr( 'disabled' ).removeAttr( 'onclick' ).addClass( 'add-field-to-editor' );				}			});			return false;		}); // end add field to form builder				/* 		* Send selected Interest group to our form		* and disable it from the available interest groups list		*/		$( 'body' ).on( 'click' , '.add-interest-group-to-editor' , function() {			// get the length, to decide if we should clear the html and append, or just append			var form_builder_length = $( '#form-builder-container' ).find( '.draggable' ).length;						var group_id = $( '.group-to-add-to-form' ).attr( 'alt' );						// temporarily disable all of the possible merge variables and interest groups (to prevent some weird stuff happening)			$( '#available-interest-groups' ).children( 'li' ).removeClass( 'available-interest-group' );						var button = $( this );			button.attr( 'disabled' , 'disabled' ).attr( 'onclick' , 'return false;' ).removeClass( 'add-interest-group-to-editor' );						// build our data			var data = {				'action' : 'add_interest_group_to_form',				'field_name' : $( '.group-to-add-to-form' ).attr( 'data-attr-field-name' ),				'group_id' : group_id,				'field_type' : $( '.group-to-add-to-form' ).attr( 'data-attr-field-type' ),				'list_id' : $( '.group-to-add-to-form' ).attr( 'data-attr-form-id' ) // grab the form ID to query the API for field data			};						// submit our ajax request			$.ajax({				url: object.ajax_url,				type:'POST',				data: data,				dataType: 'html',				success : function( response, textStatus, jqXHR) { 					$( '.group-to-add-to-form' ).removeClass( 'group-to-add-to-form' ).addClass( 'not-available' );					$( '.add-interest-group-to-editor' ).hide();					if( form_builder_length < 1 ) {						$( '#form-builder-container' ).html( '' ).append( response );					} else {						$( '#form-builder-container' ).append( response );					}					// add a value to the position					// $( '.field-'+group_id+'-position' ).val( parseInt( form_builder_length + 1 ) ); // add one :)				},				error : function( jqXHR, textStatus, errorThrown ) { 					alert( textStatus+jqXHR.status+jqXHR.responseText+"..." ); 				},				complete : function( jqXHR, textStatus ) {					console.log( 'interest group successfully added to the form..' );					// temporarily disable all of the possible merge variables and interest groups (to prevent some weird stuff happening)					$( '#available-interest-groups' ).children( 'li' ).addClass( 'available-interest-group' );					button.removeAttr( 'disabled' ).removeAttr( 'onclick' ).addClass( 'add-interest-group-to-editor' );				}			});			return false;		}); // end add field to form builder						// initiailize color pickers		$('.color-picker').each(function() {			$( this ).wpColorPicker();		}); // end color picker initialization				/* Toggle settings hidden containers */		$( 'body' ).on( 'click' , '.expansion-section-title' , function() {			$( this ).next().stop().slideToggle();			$( this ).find( '.dashicons' ).toggleClass( 'dashicons-minus' );			return false;		});				/* Toggle Selected Class (Available Merge Vars) */		$( 'body' ).on( 'click' , '.available-form-field' , function() {			if( $( this ).hasClass( 'not-available' ) ) {				return false;			} else {				if( $( this ).hasClass( 'field-to-add-to-form' ) ) {					$( this ).removeClass( 'field-to-add-to-form' );					$( '.add-field-to-editor' ).stop().fadeOut();				} else {					$( '.field-to-add-to-form' ).removeClass( 'field-to-add-to-form' );					$( this ).toggleClass( 'field-to-add-to-form' );					$( '.add-field-to-editor' ).stop().fadeIn();				}			}		});				/* Toggle Selected Class (Available Merge Vars) */		$( 'body' ).on( 'click' , '.available-interest-group' , function() {			if( $( this ).hasClass( 'not-available' ) ) {				return false;			} else {				if( $( this ).hasClass( 'group-to-add-to-form' ) ) {					$( this ).removeClass( 'group-to-add-to-form' );					$( '.add-interest-group-to-editor' ).stop().fadeOut();				} else {					$( '.group-to-add-to-form' ).removeClass( 'group-to-add-to-form' );					$( this ).toggleClass( 'group-to-add-to-form' );					$( '.add-interest-group-to-editor' ).stop().fadeIn();				}			}		});					/* Toggle Additional Form Settings (customizer, builder, error messages) */		$( 'body' ).on( 'click' , '.hidden_setting' , function() {			$( '.hidden_setting' ).removeClass( 'selected_hidden_setting' );			$( '.selected_setting_triangle' ).remove();			$( this ).addClass( 'selected_hidden_setting' ).append( '<div class="selected_setting_triangle"></div>' );			var container = $( this ).attr( 'alt' );			$( '.hidden-setting-label' ).hide();			$( '#'+container ).show();		});				/* Close the form when clickcing 'close' */		$( 'body' ).on( 'click' , '.close-form-expansion' , function() {			$( this ).parents( '.yikes-mc-settings-expansion-section' ).slideToggle().prev().find( '.dashicons' ).toggleClass( 'dashicons-minus' );			return false;		});				// Toggle between 'Merge Varialbe' & 'Interest Group' Tabs		$( 'body' ).on( 'click' , '.mv_ig_list .nav-tab' , function() {			if( $( this ).hasClass( 'nav-tab-active' ) ) {				return false;			}			if( $( this ).hasClass( 'nav-tab-disabled' ) ) {				return false;			}			$( '.mv_ig_list .nav-tab' ).removeClass( 'nav-tab-active' );			$( '.arrow-down' ).remove();			$( this ).addClass( 'nav-tab-active' ).prepend( '<div class="arrow-down"></div>' );			$( '.mv_ig_list .nav-tab' ).addClass( 'nav-tab-disabled' );			var clicked_tab = $( this ).attr( 'alt' );			if( clicked_tab == 'merge-variables' ) {				$( '#merge-variables-container' ).stop().animate({					left: '0px'				}, function() {					$( '.mv_ig_list .nav-tab' ).removeClass( 'nav-tab-disabled' );				});				$( '#interest-groups-container' ).stop().animate({					left: '+=268px'				}, function() {					$( '.mv_ig_list .nav-tab' ).removeClass( 'nav-tab-disabled' );				});			} else {				$( '#merge-variables-container' ).stop().animate({					left: '-=278px'				}, function() {					$( '.mv_ig_list .nav-tab' ).removeClass( 'nav-tab-disabled' );				});				$( '#interest-groups-container' ).stop().animate({					left: '-=268px'				}, function() {					$( '.mv_ig_list .nav-tab' ).removeClass( 'nav-tab-disabled' );				});			}			return false;		});			});	 })( jQuery );/* Toggle Page Slection for form submission redirection */function togglePageRedirection( e ) {	if( e.value == 1 ) {		jQuery( '#redirect-user-to-selection-label' ).fadeIn();	} else {		jQuery( '#redirect-user-to-selection-label' ).fadeOut();	}}/* Pass the clicked element for proper populating */function storeGlobalClicked( e ) {	// get the input field name	var parent_name = e.parents( 'td' ).find( 'input' ).attr( 'name' );	// pass it to hidden thickbox field	jQuery( '.clicked-input' ).val( parent_name );}/* Populate the input field with the selected tag */function populateDefaultValue( e ) {	// store the tag	var tag = e.text;	// store the value	var field = jQuery( '.clicked-input' ).val();	// clear input	jQuery( '.clicked-input' ).val( '' );	// remove thickbox	tb_remove();	// populate the field	jQuery( 'input[name="'+field+'"]' ).val( tag );}