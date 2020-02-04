<?php
$currentUrl = url()->current();
?>
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<link href="{{asset('vendor/harimayco-menu/style.css')}}" rel="stylesheet">
<div id="hwpwrap">
	<div class="custom-wp-admin wp-admin wp-core-ui js   menu-max-depth-0 nav-menus-php auto-fold admin-bar">
		<div id="wpwrap">
			<div id="wpcontent">
				<div id="wpbody">
					<div id="wpbody-content">

						<div class="wrap">

							<div class="card shadow mb-12">
								<div class="card-body">
									<form method="get" action="{{ $currentUrl }}">
										<div class="form-group">
											<p>
												Select the menu you want to edit: {!! Menu::select('menu', $menulist) !!} <input type="submit" class="button-secondary" value="Choose">
												&nbsp;or <a href="{{ $currentUrl }}?action=edit&menu=0">Create new menu</a>.
											</p>
											<p>  </p>
										</div>
									</form>
								</div>
							</div>
							<div id="nav-menus-frame">

								@if(request()->has('menu')  && !empty(request()->input("menu")))
								<div id="menu-settings-column" class="metabox-holder">

									<div class="clear"></div>

									<form id="nav-menu-meta" action="" class="nav-menu-meta" method="post" enctype="multipart/form-data">										
										<div class="card shadow mb-4">
											<!-- Card Header - Accordion -->
											<a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardExample">
											<h6 class="m-0 font-weight-bold text-primary">Custom Link</h6>
											</a>
											<!-- Card Content - Collapse -->
											<div class="collapse show" id="collapseCardExample" style="">
												<div class="card-body">
													<div class="form-group">
														<input id="custom-menu-item-url" name="url" type="text" class="menu-item-textbox form-control" placeholder="Specify the URL">
													</div>
													<div class="form-group">
														<input id="custom-menu-item-name" name="label" type="text" class="menu-item-textbox form-control" placeholder="Specify the Label">
													</div>
													@if(!empty($roles))
														<div class="form-group">
															<select id="custom-menu-item-role" name="role">
																<option value="0">Select Role</option>
																@foreach($roles as $role)
																	<option value="{{ $role->$role_pk }}">{{ ucfirst($role->$role_title_field) }}</option>
																@endforeach
															</select>
														</div>
													@endif
												</div>
												<div class="card-footer">
													<a  href="#" onclick="addcustommenu()"  class="btn button button-primary"  >Add menu item</a>
												</div>
											</div>
										</div>
									</form>

								</div>
								@endif
								<div id="menu-management-liquid" class="card shadow mb-8">
									<div id="menu-management">
										<form id="update-nav-menu" action="" method="post" enctype="multipart/form-data">
											<div class="menu-edit ">
												<div class="card-header py-8">
													<div class="major-publishing-actions">
														<div class="form-group"><label class="m-0 font-weight-bold text-primary pull-left pull-left">Name:</label>
															<input name="menu-name" id="menu-name" type="text" class="menu-name regular-text menu-item-textbox pull-left" title="Enter menu name" value="@if(isset($indmenu)){{$indmenu->name}}@endif">
															<input type="hidden" id="idmenu" value="@if(isset($indmenu)){{$indmenu->id}}@endif" />														

															@if(request()->has('action'))
															<div class="publishing-action">
																<a onclick="createnewmenu()" name="save_menu" id="save_menu_header" class="button button-primary menu-save">Create menu</a>
															</div>
															@elseif(request()->has("menu"))
															<div class="publishing-action">
																<a onclick="getmenus()" name="save_menu" id="save_menu_header" class="button button-primary menu-save">Save menu</a>
																<span class="spinner" id="spincustomu2"></span>
															</div>

															@else
															<div class="publishing-action">
																<a onclick="createnewmenu()" name="save_menu" id="save_menu_header" class="button button-primary menu-save">Create menu</a>
															</div>
															@endif
														</div>
													</div>
												</div>
												<div id="post-body">
													<div id="post-body-content" class="card-body">

														@if(request()->has("menu"))
														<h3>Menu Structure</h3>
														<div class="drag-instructions post-body-plain" style="">
															<p>
																Place each item in the order you prefer. Click on the arrow to the right of the item to display more configuration options.
															</p>
														</div>

														@else
														<h3>Menu Creation</h3>
														<div class="drag-instructions post-body-plain" style="">
															<p>
																Please enter the name and select "Create menu" button
															</p>
														</div>
														@endif

														<ul class="menu ui-sortable" id="menu-to-edit">
															@if(isset($menus))
															@foreach($menus as $m)
															<li id="menu-item-{{$m->id}}" class="menu-item menu-item-depth-{{$m->depth}} menu-item-page menu-item-edit-inactive pending" style="display: list-item;">
																<dl class="menu-item-bar">
																	<dt class="menu-item-handle">
																		<span class="item-title"> <span class="menu-item-title"> <span id="menutitletemp_{{$m->id}}">{{$m->label}}</span> <span style="color: transparent;">|{{$m->id}}|</span> </span> <span class="is-submenu" style="@if($m->depth==0)display: none;@endif">Subelement</span> </span>
																		<span class="item-controls"> <span class="item-type">Link</span> <span class="item-order hide-if-js"> <a href="{{ $currentUrl }}?action=move-up-menu-item&menu-item={{$m->id}}&_wpnonce=8b3eb7ac44" class="item-move-up"><abbr title="Move Up">↑</abbr></a> | <a href="{{ $currentUrl }}?action=move-down-menu-item&menu-item={{$m->id}}&_wpnonce=8b3eb7ac44" class="item-move-down"><abbr title="Move Down">↓</abbr></a> </span> <a class="item-edit" id="edit-{{$m->id}}" title=" " href="{{ $currentUrl }}?edit-menu-item={{$m->id}}#menu-item-settings-{{$m->id}}"> </a> </span>
																	</dt>
																</dl>

																<div class="menu-item-settings" id="menu-item-settings-{{$m->id}}">
																	<input type="hidden" class="edit-menu-item-id" name="menuid_{{$m->id}}" value="{{$m->id}}" />
																	<p class="description description-thin">
																		<label for="edit-menu-item-title-{{$m->id}}"> Label
																			<br>
																			<input type="text" id="idlabelmenu_{{$m->id}}" class="widefat edit-menu-item-title" name="idlabelmenu_{{$m->id}}" value="{{$m->label}}">
																		</label>
																	</p>

																	<p class="field-css-classes description description-thin">
																		<label for="edit-menu-item-classes-{{$m->id}}"> Class CSS (optional)
																			<br>
																			<input type="text" id="clases_menu_{{$m->id}}" class="widefat code edit-menu-item-classes" name="clases_menu_{{$m->id}}" value="{{$m->class}}">
																		</label>
																	</p>

																	<p class="field-css-url description description-wide">
																		<label for="edit-menu-item-url-{{$m->id}}"> Url
																			<br>
																			<input type="text" id="url_menu_{{$m->id}}" class="widefat code edit-menu-item-url" id="url_menu_{{$m->id}}" value="{{$m->link}}">
																		</label>
																	</p>

																	@if(!empty($roles))
																	<p class="field-css-role description description-wide">
																		<label for="edit-menu-item-role-{{$m->id}}"> Role
																			<br>
																			<select id="role_menu_{{$m->id}}" class="widefat code edit-menu-item-role" name="role_menu_[{{$m->id}}]" >
																				<option value="0">Select Role</option>
																				@foreach($roles as $role)
																					<option @if($role->id == $m->role_id) selected @endif value="{{ $role->$role_pk }}">{{ ucwords($role->$role_title_field) }}</option>
																				@endforeach
																			</select>
																		</label>
																	</p>
																	@endif

																	<p class="field-move hide-if-no-js description description-wide">
																		<label> <span>Move</span> <a href="{{ $currentUrl }}" class="menus-move-up" style="display: none;">Move up</a> <a href="{{ $currentUrl }}" class="menus-move-down" title="Mover uno abajo" style="display: inline;">Move Down</a> <a href="{{ $currentUrl }}" class="menus-move-left" style="display: none;"></a> <a href="{{ $currentUrl }}" class="menus-move-right" style="display: none;"></a> <a href="{{ $currentUrl }}" class="menus-move-top" style="display: none;">Top</a> </label>
																	</p>

																	<div class="menu-item-actions description-wide submitbox">

																		<a class="item-delete submitdelete deletion" id="delete-{{$m->id}}" href="{{ $currentUrl }}?action=delete-menu-item&menu-item={{$m->id}}&_wpnonce=2844002501">Delete</a>
																		<span class="meta-sep hide-if-no-js"> | </span>
																		<a class="item-cancel submitcancel hide-if-no-js button-secondary" id="cancel-{{$m->id}}" href="{{ $currentUrl }}?edit-menu-item={{$m->id}}&cancel=1424297719#menu-item-settings-{{$m->id}}">Cancel</a>
																		<span class="meta-sep hide-if-no-js"> | </span>
																		<a onclick="getmenus()" class="button button-primary updatemenu" id="update-{{$m->id}}" href="javascript:void(0)">Update item</a>

																	</div>

																</div>
																<ul class="menu-item-transport"></ul>
															</li>
															@endforeach
															@endif
														</ul>
														<div class="menu-settings">

														</div>
													</div>
												</div>
												<div class="card-footer">
													<div class="major-publishing-actions">

														@if(request()->has('action'))
														<div class="publishing-action">
															<a onclick="createnewmenu()" name="save_menu" id="save_menu_header" class="button button-primary menu-save">Create menu</a>
														</div>
														@elseif(request()->has("menu"))
														<span class="delete-action"> <a class="submitdelete deletion menu-delete" onclick="deletemenu()" href="javascript:void(9)">Delete menu</a> </span>
														<div class="publishing-action">

															<a onclick="getmenus()" name="save_menu" id="save_menu_header" class="button button-primary menu-save">Save menu</a>
															<span class="spinner" id="spincustomu2"></span>
														</div>

														@else
														<div class="publishing-action">
															<a onclick="createnewmenu()" name="save_menu" id="save_menu_header" class="button button-primary menu-save">Create menu</a>
														</div>
														@endif
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>

						<div class="clear"></div>
					</div>

					<div class="clear"></div>
				</div>
				<div class="clear"></div>
			</div>

			<div class="clear"></div>
		</div>
	</div>
</div>
