import os
from geojson import Point, Feature, FeatureCollection, dump
import json
from shapely.ops import unary_union, linemerge

relative_path =     'Github/vehrmann.github.io/bw-karte/gpx/'
filename_input =    'at_autobahnabschnitte_mautfrei_input.geojson'
filename_output =   'at_autobahnabschnitte_mautfrei_output.geojson'
input_geojson_path =    os.path.abspath(relative_path + filename_input)
output_geojson_path =   os.path.abspath(relative_path + filename_output)

# Read the GeoJSON file
with open(input_geojson_path, 'r') as f:
    geojson_data = json.load(f)

# Extract LineString and MultiLineString features from the GeoJSON
coords_lines = [feature['geometry']['coordinates'] for feature in geojson_data['features'] if feature['geometry']['type'] == 'LineString']
#merged_lines = linemerge(coords_lines)
merged_lines = list(linemerge(coords_lines).geoms)

features = []
i = 1
for line in merged_lines:
    #features.append(Feature(geometry=point, properties={"name": "XYZ"}))
    print(f"XYZ{i}")
    features.append(Feature(geometry=line, properties={"name": f"XYZ{i}"} ))
    i += 1

feature_collection = FeatureCollection(features)

with open(output_geojson_path, 'w') as f:
   dump(feature_collection, f)

"""
# Write the combined GeoJSON to a new file
with open(output_geojson_path, 'w') as f:
    geojson.dump(output_geojson_data, f, indent=2)

print(f'Combined features written to {output_geojson_path}')
"""