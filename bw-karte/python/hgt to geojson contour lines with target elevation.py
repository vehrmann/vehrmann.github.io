"""
from osgeo import gdal, ogr
import os

def generate_contours(input_hgt_file, output_geojson, contour_interval, target_elevation):
    # Open the DEM file using GDAL
    ds = gdal.Open(input_hgt_file)

    # Create a contour layer
    contour_ds = ogr.GetDriverByName('GeoJSON').CreateDataSource(output_geojson)
    contour_layer = contour_ds.CreateLayer('contours', geom_type=ogr.wkbLineString)
    
    # Define contour intervals
    gdal.ContourGenerate(ds.GetRasterBand(1), contour_interval, 0, [target_elevation], 0, 0, contour_layer, 0, 1)

    # Close the GeoJSON and DEM datasets
    contour_ds = None
    ds = None

if __name__ == "__main__":
    # Define input HGT file, output GeoJSON file, contour interval, and target elevation
    input_hgt_file = 'C:/Users/vehrm/Documents/Projekte/Programmierung/Github/vehrmann.github.io/bw-karte/python/N47E011.hgt'
    output_geojson = 'C:/Users/vehrm/Documents/Projekte/Programmierung/Github/vehrmann.github.io/bw-karte/python/N47E011_contours_1200.geojson'
    contour_interval = 100  # Adjust the interval as needed
    target_elevation = 1200

    # Generate contours for the target elevation and save to GeoJSON
    generate_contours(input_hgt_file, output_geojson, contour_interval, target_elevation)

    print(f"Contour lines for {target_elevation}m generated and saved to {output_geojson}")
    """
    


from osgeo import gdal, ogr
import os

def generate_contours(input_hgt_file, output_geojson, contour_interval, target_elevation, min_area_threshold):
    # Open the DEM file using GDAL
    ds = gdal.Open(input_hgt_file)

    # Create a contour layer
    contour_ds = ogr.GetDriverByName('GeoJSON').CreateDataSource(output_geojson)
    contour_layer = contour_ds.CreateLayer('contours', geom_type=ogr.wkbLineString)
    
    # Define contour intervals
    gdal.ContourGenerate(ds.GetRasterBand(1), contour_interval, 0, [target_elevation], 0, 0, contour_layer, 0, 1)

    # Filter out small polygons
    contour_layer.SetAttributeFilter(f"OGR_GEOMETRY_AREA >= {min_area_threshold}")

    # Create a new layer to save the filtered contours
    filtered_layer = contour_ds.CreateLayer('filtered_contours', geom_type=ogr.wkbLineString)

    # Copy features from the original layer to the filtered layer
    for feature in contour_layer:
        filtered_layer.CreateFeature(feature)

    # Close the GeoJSON and DEM datasets
    contour_ds = None
    ds = None

if __name__ == "__main__":
    # Define input HGT file, output GeoJSON file, contour interval, target elevation, and min area threshold
    input_hgt_file = 'C:/Users/vehrm/Documents/Projekte/Programmierung/Github/vehrmann.github.io/bw-karte/python/N47E011.hgt'
    output_geojson = 'C:/Users/vehrm/Documents/Projekte/Programmierung/Github/vehrmann.github.io/bw-karte/python/N47E011_contours_1200.geojson'
    contour_interval = 100  # Adjust the interval as needed
    target_elevation = 1200
    min_area_threshold = 1000  # Adjust the threshold as needed

    # Generate contours for the target elevation, filter small areas, and save to GeoJSON
    generate_contours(input_hgt_file, output_geojson, contour_interval, target_elevation, min_area_threshold)

    print(f"Contour lines for {target_elevation}m generated, filtered, and saved to {output_geojson}")
