<?php
error_reporting(0);
include ($_SERVER['DOCUMENT_ROOT'].'/siteconfig.php');
include ($_SERVER['DOCUMENT_ROOT'].'/apifunctions.php');

if (!$_POST['phrase'])
{
	$_POST['phrase'] ="auto";
}

$brands = get_brands($siteId,$apiBase,$apiKey,$siteLanguage);
$dobrands=array();
$x=0;

while(list($key,$value) = each($brands['brands']))
{

if ($value['adv']['count'])
{
	if ( substr($key,0,strlen($_POST['phrase']))==$_POST['phrase'] )
	{
		$dobrands[$key]['name']="$key ({$value['adv']['count']}) (merk)";
		$dobrands[$key]['code']=str_replace(" ","-",strtolower($key));
	$x++;
	}
}
}
#print "<pre>";
#print_r ( $dobrands );
sort ( $dobrands );


$searchdata=array();
$searchdata['search']['name']="{$_POST['phrase']}*";
$searchdata['search']['site']="$siteId";


$pk = companynames($siteId,$apiBase,$apiKey,$siteLanguage,$searchdata );

#$dobrands=array();
while(list($key,$value) = each($pk['companynames']))
{
	$dobrands[]['name']="{$value['name']} (Bedrijf)";
	#$x++;
}


print_r ( json_encode ($dobrands ));

?>