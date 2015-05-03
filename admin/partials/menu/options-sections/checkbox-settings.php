<?php/** * Options page for rendering checkboxes * * Page template that houses all of the checkbox settings. * * @since 6.0.0 * * @package WordPress * @subpackage Component*/		// active plugins array	// defaults: comments / registration	$active_plugins = array(		'comment_form' => __( 'Comment Form', $this->text_domain ),		'registration_form' => __( 'Registration Form', $this->text_domain )	);			// Easy Digital Downloads	if( class_exists( 'Easy_Digital_Downloads' ) ) {		$active_plugins['easy_digital_downloads_checkout_form'] = __( 'Easy Digital Downloads Checkout', $this->text_domain );	}	// WooCommerce	if( class_exists( 'WooCommerce' ) ) {		$active_plugins['woocommerce_checkout_form'] = __( 'WooCommerce Checkout', $this->text_domain );	}	// BuddyPress	if( class_exists( 'BuddyPress' ) ) {		$checkbox_plugins['buddypress_form'] = __( 'BuddyPress Registration', $this->text_domain );	}	// bbPress	if( class_exists( 'bbPress' ) ) {		$checkbox_plugins['bbpress_forms'] = __( 'bbPress', $this->text_domain );	}?><h3><span><?php _e( 'Checkbox Settings' , $this->text_domain ); ?></span><?php echo $api_connection; ?></h3><div class="inside">		<p>		<?php _e( 'Select which plugins should integrate with Yikes Inc. Easy MailChimp. Depending on which plugins you choose to integrate with, an optin checkbox will be generated. For example, the comment form checkbox will generate a checkbox below the standard WordPress comment form to add commenters to a specific mailing list.' , $this->text_domain ); ?>	</p>		<!-- Settings Form -->	<form action='options.php' method='post'>												<ul style="display:inline-block;">		<?php			if( !empty( $active_plugins ) ) { 				foreach( $active_plugins as $class => $value ) {					?>						<li>							<input type="checkbox" name="plugin_checkboxes[<?php echo $class; ?>]"><?php echo ucwords( $value ); ?></li>						</li>					<?php				}			} else {				?>					<li>						<?php _e( 'Nothing is active.' , $this->text_domain ); ?>					</li>				<?php			}		?>	</ul>	<p class="description"><?php _e( 'This is currently being built out and will begin working in future releases.' , $this->text_domain ); ?></p>															<?php submit_button(); ?>										</form></div> <!-- .inside -->