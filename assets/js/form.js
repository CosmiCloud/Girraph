function add(property){
  if(parseInt($('#total'+property+'_check').val()) != 3){
    var new_check_num = parseInt($('#total'+property+'_check').val())+1;
    var new_field_input="<input type='text' class='form-control' style='padding:3px 10px;border:1px solid #6168ED;margin-bottom:1px;' name='"+property+"Field"+new_check_num+"' id='"+property+"Field"+new_check_num+"' placeholder='field...' >";
    var new_value_input="<input type='text' class='form-control' style='padding:3px 10px;border:1px solid #6168ED;margin-bottom:1px;' name='"+property+"Value"+new_check_num+"' id='"+property+"Value"+new_check_num+"' placeholder='value...' >";
    $('#'+property+'Field_check').append(new_field_input);
    $('#'+property+'Value_check').append(new_value_input);
    $('#total'+property+'_check').val(new_check_num)
  }
}

function remove(property){
  var last_check_num = $('#total'+property+'_check').val();
  if(last_check_num>1){
    $('#'+property+'Field'+last_check_num).remove();
    $('#'+property+'Value'+last_check_num).remove();
    $('#total'+property+'_check').val(last_check_num-1);
  }
}

function buildform(property){
  if(document.getElementById(`${property}_row`)){
    document.getElementById(`${property}_row`).remove();
    document.getElementById(`${property}`).style.color = '#6168ED';
  }else{
    document.getElementById(`${property}`).style.color = '#13B785';
    var new_row = `<div class="row" id="${property}_row" style="padding-bottom:10px;">
      <p style="margin-bottom:-1px;color:#6168ED">${property}</p>
      <div class="col-md-1 form-group">
        <div class="php-email-form">
          <button type="button" id="add_button" class="add_button" onclick="add('${property}')" style="padding:3px 10px;background-color:#6168ED;">+</button>
        </div>
      </div>
      <div class="col-md-1 form-group">
        <div class="php-email-form">
          <button type="button" id="sub_button" class="sub_button" onclick="remove('${property}')" style="padding:3px 12px;background-color:#6168ED;">-</button>
        </div>
      </div>
      <div class="col-md-4 form-group">
        <input type="text" class="form-control" name="${property}Field1" id="${property}Field1" placeholder="field..." style="padding:3px 10px;border:1px solid #6168ED;margin-bottom:1px;" pattern=".{1,}">
        <div id="${property}Field_check"></div>
        <input type="hidden" value="1" id="total${property}_check">
      </div>
      <div class="col-md-4 form-group">
        <input type="text" class="form-control" name="${property}Value1" id="${property}Value1" placeholder="value..." style="padding:3px 10px;border:1px solid #6168ED;margin-bottom:1px;" pattern=".{1,}">
        <div id="${property}Value_check"></div>
        <input type="hidden" value="1" id="total${property}_check">
      </div>
      <div style="height:1px;width:85%;background-color:#D1D1D1;margin-top:7px;"></div>
    </div>`

    $('#form_elements').append(new_row);
  }
}

// END SHOW FORM ELEMENTS
function build_options(){
  $('.multi_list_option').remove();
  document.getElementById("form_elements").innerHTML = '';
  action_list = ["actionStatus","agent","endTime","error","instrument","location","object","participant","provider","result","target","additionalType","alternateName","description","disambiguatingDescription","identifier","image","mainEntityOfPage","name","potentialAction","sameAs","subjectOf","url"]

  biochem_list=["associatedDisease","bioChemInteraction","bioChemSimilarity","biologicalRole","hasBioChemEntityPart","hasMolecularFunction","hasRepresentation","isEncodedByBioChemEntity","isInvolvedInBiologicalProcess","isLocatedInSubcellularLocation","isPartOfBioChemEntity","taxonomicRange","additionalType","alternateName","description","disambiguatingDescription","identifier","image","mainEntityOfPage","name","potentialAction","sameAs","subjectOf","url"]

  creativework_list = ["about","abstract","accessMode","accessModeSufficient","accessibilityAPI","accessibilityControl","accessibilityFeature","accessibilityHazard","accessibilitySummary","accountablePerson","acquireLicensePage","actionableFeedbackPolicy","aggregateRating","alternativeHeadline","archivedAt","appearance","audience","audio","author","award","backstory","character","cheatCode","citation","comment","commentCount","conditionsOfAccess","contentLocation","contentRating","contentReferenceTime","contributor","copyrightHolder","copyrightNotice","copyrightYear","correction","correctionsPolicy","countryOfOrigin","creativeWorkStatus","creator","creditText","dateCreated","dateModified","datePublished","discusses","diversityPolicy","documentation","editEIDR","editor","educationalAlignment","educationalLevel","educationalUse","encodesCreativeWork","encoding","encodingFormat","ethicsPolicy","exampleOfWork","expires","firstAppearance","fundedItem","funder","funding","gameTip","genre","hasPart","headline","inLanguage","interactivityType","isBasedOn","isPartOf","license","locationCreated","lyrics","mainEntity","maintainer","masthead","material","materialExtent","mentions","messageAttachment","missionCoveragePrioritiesPolicy","noBylinesPolicy","offers","ownershipFundingInfo","pattern","position","producer","provider","publication","publisher","publisherImprint","publishingPrinciples","recipeInstructions","recordedAt","recordedIn","releasedEvent","review","schemaVersion","sdDatePublished","sdLicense","sdPublisher","sharedContent","size","softwareHelp","sourceOrganization","spatial","spatialCoverage","sponsor","step","steps","teaches","temporal","temporalCoverage","text","thumbnailUrl","timeRequired","translationOfWork","translator","typicalAgeRange","unnamedSourcesPolicy","usageInfo","verificationFactCheckingPolicy","version","video","workExample","workFeatured","workPerformed","workTranslation","additionalType","alternateName","description","disambiguatingDescription","identifier","image","mainEntityOfPage","name","potentialAction","sameAs","subjectOf","url"]

  event_list = ["about","actor","aggregateRating","attendee","audience","composer","contributor","director","doorTime","duration","endDate","eventAttendanceMode","eventSchedule","eventStatus","funder","funding","inLanguage","location","maximumAttendeeCapacity","maximumPhysicalAttendeeCapacity","maximumVirtualAttendeeCapacity","offers","organizer","performer","previousStartDate","recordedIn","remainingAttendeeCapacity","review","sponsor","startDate","subEvent","superEvent","translator","typicalAgeRange","workFeatured","workPerformed","additionalType","alternateName","description","disambiguatingDescription","identifier","image","mainEntityOfPage","name","potentialAction","sameAs","subjectOf","url"]

  intangible_list = ["additionalType","alternateName","description","disambiguatingDescription","identifier","image","mainEntityOfPage","name","potentialAction","sameAs","subjectOf","url"]

  medentity_list = ["code","guideline","legalStatus","medicineSystem","recognizingAuthority","relevantSpecialty","study","additionalType","alternateName","description","disambiguatingDescription","identifier","image","mainEntityOfPage","name","potentialAction","sameAs","subjectOf","url"]

  org_list = ["actionableFeedbackPolicy","address","aggregateRating","alumni","areaServed","award","brand","contactPoint","correctionsPolicy","department","dissolutionDate","diversityPolicy","diversityStaffingReport","duns","email","employee","ethicsPolicy","event","faxNumber","founder","foundingDate","foundingLocation","funder","funding","globalLocationNumber","hasCredential","hasMerchantReturnPolicy","hasOfferCatalog","hasPOS","interactionStatistic","isicV4","iso6523Code","knowsAbout","knowsLanguage","legalName","leiCode","location","logo","makesOffer","member","memberOf","naics","nonprofitStatus","numberOfEmployees","ownershipFundingInfo","owns","parentOrganization","publishingPrinciples","review","seeks","slogan","sponsor","subOrganization","taxID","telephone","unnamedSourcesPolicy","vatID","additionalType","alternateName","description","disambiguatingDescription","identifier","image","mainEntityOfPage","name","potentialAction","sameAs","subjectOf","url"]

  person_list = ["additionalName","address","affiliation","alumniOf","award","birthDate","birthPlace","brand","callSign","children","colleague","contactPoint","deathDate","deathPlace","duns","email","familyName","faxNumber","follows","funder","funding","gender","givenName","globalLocationNumber","hasCredential","hasOccupation","hasOfferCatalog","hasPOS","height","homeLocation","honorificPrefix","honorificSuffix","interactionStatistic","isicV4","jobTitle","knows","knowsAbout","knowsLanguage","makesOffer","memberOf","naics","nationality","netWorth","owns","parent","performerIn","publishingPrinciples","relatedTo","seeks","sibling","sponsor","spouse","taxID","telephone","vatID","weight","workLocation","worksFor","additionalType","alternateName","description","disambiguatingDescription","identifier","image","mainEntityOfPage","name","potentialAction","sameAs","subjectOf","url"]

  place_list = ["additionalProperty","address","aggregateRating","amenityFeature","branchCode","containedInPlace","containsPlace","event","faxNumber","geo","geoContains","geoCovers","geoCrosses","geoDisjoint","geoEquals","geoIntersects","geoOverlaps","geoTouches","geoWithin","globalLocationNumber","hasDriveThroughService","hasMap","isicV4","latitude","logo","longitude","maximumAttendeeCapacity","openingHoursSpecification","photo","publicAccess","review","slogan","smokingAllowed","specialOpeningHoursSpecification","telephone","tourBookingPage","additionalType","alternateName","description","disambiguatingDescription","identifier","image","mainEntityOfPage","name","potentialAction","sameAs","subjectOf","url"]

  product_list = ["additionalProperty","aggregateRating","audience","award","brand","category","color","countryOfAssembly","countryOfLastProcessing","countryOfOrigin","depth","gtin","gtin12","gtin13","gtin14","gtin8","hasAdultConsideration","hasEnergyConsumptionDetails","hasMeasurement","hasMerchantReturnPolicy","height","inProductGroupWithID","isAccessoryOrSparePartFor","isConsumableFor","isFamilyFriendly","isRelatedTo","isSimilarTo","isVariantOf","itemCondition","logo","manufacturer","material","model","mpn","nsn","offers","pattern","productID","productionDate","purchaseDate","releaseDate","review","size","sku","slogan","weight","width","additionalType","alternateName","description","disambiguatingDescription","identifier","image","mainEntityOfPage","name","potentialAction","sameAs","subjectOf","url"]

  if (document.getElementById("Action").selected == true) {
    document.getElementById("type").value = 'Action';
    list = action_list
  }

  if (document.getElementById("BioChemEntity").selected == true) {
    document.getElementById("type").value = 'BioChemEntity';
    list = biochem_list
  }

  if (document.getElementById("CreativeWork").selected == true) {
    document.getElementById("type").value = 'CreativeWork';
    list = creativework_list
  }

  if (document.getElementById("Event").selected == true) {
    document.getElementById("type").value = 'Event';
    list = event_list
  }

  if (document.getElementById("Intangible").selected == true) {
    document.getElementById("type").value = 'Intangible';
    list = intangible_list
  }

  if (document.getElementById("MedicalEntity").selected == true) {
    document.getElementById("type").value = 'MedicalEntity';
    list = medentity_list
  }

  if (document.getElementById("Organization").selected == true) {
    document.getElementById("type").value = 'Organization';
    list = org_list
  }

  if (document.getElementById("Person").selected == true) {
    document.getElementById("type").value = 'Person';
    list = person_list
  }

  if (document.getElementById("Place").selected == true) {
    document.getElementById("type").value = 'Place';
    list = place_list
  }

  if (document.getElementById("Product").selected == true) {
    document.getElementById("type").value = 'Product';
    list = product_list
  }

  for(i = 0; i < list.length; i++){
    option = list[i]
    console.log(option)
    new_option_element = `<option id="${option}" onclick="buildform('${option}')" class="multi_list_option">${option}</option>`
    console.log(new_option_element);
    $('#multi-select').append(new_option_element);
  }
}
